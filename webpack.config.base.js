const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

/**
 * development
 * cheap-module-source-map
 * 프로덕션 배포시 = 
 * mdoe : production
 * devtool 제거
 */
module.exports = {
	entry: {
		testPageRenderer: "./src/main/resources/js/page/test.ts"
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, './view/js/dist')
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader", "postcss-loader"],
				exclude: /node_modules/,
			},
			{
				test: /\.{png|jpg}$/,
				use: ['file-loader'],
				exclude: path.resolve(__dirname, './view/image/')
			}
		],
	},
	plugin: [
		"postcss-syntactic-sugar",
		"postcss-non-standard",
		[
			"postcss-preset-env",
			{
				// plugin options
			},
		],
	],
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".css"],
		alias: {
			'@component': path.resolve(__dirname, './view/js/component/'),
			'@handler': path.resolve(__dirname, './view/js/handler/'),
			'@root': path.resolve(__dirname, './view')
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
	},
	performance: {
		hints: false
	}
}