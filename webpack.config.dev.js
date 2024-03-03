const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		static: {
			directory: path.join(__dirname, 'src/main/resources/static/dist'),
		},
		watchFiles: {
			paths: [
				path.join(__dirname, './src/main/resources/static/dist/*.js'),
				path.join(__dirname, './src/main/resources/static/dist/*.css')
			]
		},
		host: 'localhost',
		port: 4568,
		proxy: {
			"**": {
				target: "https://localhost:8443",
				secure: false
			}
		}
	},
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
		moduleIds: 'named'
	},
	performance: {
		hints: false
	}
})
