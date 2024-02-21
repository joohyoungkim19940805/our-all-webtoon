
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * development
 * cheap-module-source-map
 * 프로덕션 배포시 = 
 * mdoe : production
 * devtool 제거
 */
module.exports = {
	entry: {
		testPageRenderer: "./view/page/test.ts"
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, './static/js/dist')
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: ['ts-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use:[MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.{png|jpg}$/,
				use: ['file-loader'],
				exclude: path.resolve(__dirname, 'view/image/')
			}
		],
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".css"],
		alias: {
			'@component': path.resolve(__dirname, 'view/component/'),
			'@handler': path.resolve(__dirname, 'view/handler/'),
			'@root': path.resolve(__dirname, 'view')
		}
	},
}