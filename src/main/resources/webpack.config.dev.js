const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
	performance: {
		hints: false
	},
	plugins: [
		new StylelintPlugin({
			cache: false,
			configFile: path.resolve(__dirname, '.stylelintrc.js'),
			context: path.resolve(__dirname, '/static/css'),
			files: '**/*.css',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		})
	]
})
