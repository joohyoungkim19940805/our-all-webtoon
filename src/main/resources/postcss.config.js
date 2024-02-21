
module.exports = {
	syntax: 'postcss-styled-components',
	plugins: [
		require('postcss-import'),
		require('postcss-preset-env')({ stage: 1 }),
		require('cssnano'),
		require('stylelint')({ configFile: '.stylelintrc.js' }),
	],
}