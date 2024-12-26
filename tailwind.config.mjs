/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");


export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: ['class', '[data-theme="dark"]'],
	theme: {
		extend: {
			colors: {
				primary: "var(--color-primary)",
				primary_action: "var(--color-primary-action)",
				secondary: "var(--color-secondary)",
			},
		},
	},
	plugins: [],
}
