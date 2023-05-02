/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				satoshi: ["Satoshi", "sans-serif"],
				eudoxus: ["Eudoxus Sans", "sans-serif"],
				inter: ["Inter", "sans-serif"],
			},
		},
	},
	plugins: [
    // eslint-disable-next-line no-undef
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
