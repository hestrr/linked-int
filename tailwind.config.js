/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
		fontFamily: {
			sans: ['Inter', 'sans-serif'],
			plex: ['IBM Plex Sans', 'sans-serif'],
			inter: ['Inter', 'sans-serif']
		}
	},
	plugins: [],
	important: true
};
