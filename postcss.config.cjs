module.exports = {
	plugins: [
		require('@csstools/postcss-global-data')({
			files: ['src/theme/breakpoints/custom-media.css'],
		}),
		require('postcss-custom-media')({ preserve: false }),
	],
};
