const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const merge = require("webpack-merge");
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
	mode: 'development',
	devtool: 'source-map',
	optimization: {
		minimize: false,
		minimizer: [
			new TerserPlugin({
			extractComments: false,
			terserOptions: {
				format: {
					comments: false,
				},
			},
			}),
		],
	},
})
