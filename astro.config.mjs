import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import {
	absoluteUrl,
	COLOMBIA_URL,
	INDEXABLE_PATHS,
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
			filter: (page) => INDEXABLE_PATHS.includes(normalizePathname(new URL(page).pathname)),
			serialize(item) {
				const pathname = normalizePathname(new URL(item.url).pathname);
				return {
					...item,
					lastmod: new Date('2026-07-30'),
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
