const colors = require('tailwindcss/colors');

module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false,
	variants: {
		extend: {}
	},
	plugins: [require('tailwind-scrollbar'), require('@tailwindcss/line-clamp')],
	theme: {
		screens: {
			xxs: '300px',
			sm: '600px',
			md: '780px',
			lg: '1024px',
			xl: '1280px'
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			white: '#fafafa',
			primary: '#ff9b01',
			dark: '#1e2b3b',
			'white-50': '#ffffff',
			'bluey-grey': '#8290b0',
			'battleship-grey': '#667085',
			'dark-grey-blue': '#353e54',
			'slate-blue': '#5c6c92',
			'cloudy-blue': '#acb5cb',
			'pinkish-orange': '#ff6939',
			'red-400': 'rgb(248 113 113)',
			'yellow-400': 'rgb(250 204 21)',
			'green-400': 'rgb(74 222 128)',
			'gray-200': 'rgb(229 231 235)',
			'gray-400': 'rgb(233 234 236)',
			'gray-600': '#c1c7d8',
			'gray-900': 'rgb(102 112 133)',
			'gray-1000': '#344054',
			'rusty-red': 'rgb(180 35 24)',
			'brick-orange': 'rgb(181 71 8)',
			'pale-grey': '#e9eaec',
			...colors
		}
	}
};
