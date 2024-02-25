
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
		path: path.resolve(__dirname, 'src/main/resources/static/dist'),
		publicPath : '/dist/',
		clean: true
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
				use:[
					MiniCssExtractPlugin.loader, 
					{
						loader : 'css-loader', 
						options: { 
							modules: true,
							importLoaders: 1 
						}
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
				exclude: path.resolve(__dirname, 'view/image/')
			}
		],
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".css"],
		alias: {
			'@components': path.resolve(__dirname, 'view/components/'),
			'@handler': path.resolve(__dirname, 'view/handler/'),
			'@root': path.resolve(__dirname, 'view')
		}
	},
}