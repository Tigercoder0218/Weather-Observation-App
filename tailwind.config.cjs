/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				lexend: ["var(--lexend)"]
			},
			screens: {
				'1xl': '1440px',
			}
		},
	},
	plugins: [],
}
