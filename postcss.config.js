
module.exports = {
	plugins: [
		require('postcss-import')({
			plugins: [
				require('stylelint')({ configFile: '.stylelintrc.js' }),
			]
		}),
		require('postcss-preset-env')({ stage: 1 }),
		require("postcss-reporter")({ clearReportedMessages: true }),
		require('cssnano'),
		
	],
}