import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	site: 'https://campuslands.com/',
    integrations: [
		tailwind(),
		vue(),
		sitemap(),
		icon()
	]
});