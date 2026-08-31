import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vue from '@astrojs/vue';
import icon from 'astro-icon';
import { SITE_URL } from './src/config/seo.mjs';

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
		icon()
	]
});
