import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import {
	absoluteUrl,
	COLOMBIA_URL,
	INDEXABLE_PATHS,
	LAST_CONTENT_UPDATE,
	normalizePathname,
	PAGE_SEO,
	SITE_URL
} from './src/config/seo.mjs';

export default defineConfig({
	site: `${SITE_URL}/`,
	trailingSlash: 'always',
	compressHTML: true,
	build: {
		inlineStylesheets: 'always'
	},
    integrations: [
		tailwind(),
		vue(),
		sitemap({
			filter: (page) => {
				const pathname = normalizePathname(new URL(page).pathname);
				return INDEXABLE_PATHS.includes(pathname) || pathname.startsWith('/blog/');
			},
			serialize(item) {
				const pathname = normalizePathname(new URL(item.url).pathname);
				const isLegalPage = pathname === '/terminos-condiciones/' || pathname === '/politica-de-privacidad/';
				const isPrimaryPage = ['/', '/joinUs/', '/ai-academy/', '/blog/', '/emplea/', '/patrocina/'].includes(pathname);
				return {
					...item,
					lastmod: new Date(LAST_CONTENT_UPDATE),
					changefreq: isLegalPage ? 'yearly' : isPrimaryPage ? 'weekly' : 'monthly',
					priority: pathname === '/' ? 1 : isPrimaryPage ? 0.9 : isLegalPage ? 0.4 : 0.8,
					links: [
						{ lang: 'es-GT', url: absoluteUrl(SITE_URL, pathname) },
						{ lang: 'es-CO', url: absoluteUrl(COLOMBIA_URL, pathname) },
						{ lang: 'x-default', url: absoluteUrl(COLOMBIA_URL, pathname) }
					]
				};
			},
			customPages: Object.keys(PAGE_SEO).map((pathname) => absoluteUrl(SITE_URL, pathname))
		}),
		icon()
	]
});
