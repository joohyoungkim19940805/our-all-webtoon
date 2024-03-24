
module.exports = {
	plugins: [
		require("postcss-flexbugs-fixes"),
		require('postcss-import')({
			plugins: [
				require('stylelint')({ configFile: '.stylelintrc.js' }),
			]
		}),
		require('postcss-preset-env')({ stage: 1 }),
		require('postcss-nested'),
		require('postcss-nested-ancestors'),
		require('postcss-reporter')({ clearReportedMessages: true }),
		require('postcss-css-variables')({preserve: true}),
		require('postcss-mixins'),
		require('@csstools/postcss-cascade-layers'),
		require('cssnano'),
		require("postcss-fail-on-warn"),
	],
}