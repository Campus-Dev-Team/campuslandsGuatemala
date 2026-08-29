import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import {
	absoluteUrl,
	colombiaAlternateFor,
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
				const colombiaAlternate = colombiaAlternateFor(pathname);
				const isLegalPage = pathname === '/terminos-condiciones/' || pathname === '/politica-de-privacidad/';
				const isPrimaryPage = ['/', '/joinUs/', '/ai-academy/', '/blog/', '/emplea/', '/patrocina/'].includes(pathname);
				const links = [
					{ lang: 'es-GT', url: absoluteUrl(SITE_URL, pathname) },
					...(colombiaAlternate
						? [
							{ lang: 'es-CO', url: colombiaAlternate },
							{ lang: 'x-default', url: colombiaAlternate }
						]
						: [])
				];
				return {
					...item,
					lastmod: new Date(LAST_CONTENT_UPDATE),
					changefreq: isLegalPage ? 'yearly' : isPrimaryPage ? 'weekly' : 'monthly',
					priority: pathname === '/' ? 1 : isPrimaryPage ? 0.9 : isLegalPage ? 0.4 : 0.8,
					links
				};
			},
			customPages: Object.keys(PAGE_SEO).map((pathname) => absoluteUrl(SITE_URL, pathname))
		}),
		icon()
	]
});
