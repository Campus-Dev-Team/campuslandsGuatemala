import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vue from '@astrojs/vue';
import node from '@astrojs/node';
import icon from 'astro-icon';
import { SITE_URL } from './src/config/seo.mjs';

export default defineConfig({
	site: `${SITE_URL}/`,
	output: 'hybrid',
	adapter: node({ mode: 'standalone' }),
	trailingSlash: 'ignore',
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
