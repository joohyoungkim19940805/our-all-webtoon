
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
				use: ['postcss-loader', 'ts-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
							// 0 => 불러올 로더 없음 (기본 값)
							// 1 => postcss-loader
							importLoaders: 1,
							sourceMap: true,
							url: false
						},
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								minimize: false
							},
							sourceMap: true
						},
					},
				],
				exclude: /node_modules/,
			},
			{
				test: /\.{png|jpg}$/,
				use: ['file-loader'],
				exclude: path.resolve(__dirname, './view/image/')
			}
		],
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".css"],
		alias: {
			'@component': path.resolve(__dirname, './view/js/component/'),
			'@handler': path.resolve(__dirname, './view/js/handler/'),
			'@root': path.resolve(__dirname, './view')
		}
	},
}