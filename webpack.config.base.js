
const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

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
			},
			{ 
				test: /\.svg$/, 
				use: [
					{
						loader: 'svg-inline-loader',
						options: {classPrefix: true, idPrefix: true}
					}
				]
			}
		],
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".css"],
		alias: {
			'@svg' : path.resolve(__dirname, './view/svg'),
			'@components' : path.resolve(__dirname, './view/components'),
			'@container' : path.resolve(__dirname, './view/container'),
			'@wrapper' : path.resolve(__dirname, './view/wrapper'),
			'@handler' : path.resolve(__dirname, './view/handler'),
			'@root' : path.resolve(__dirname, './view')
		},
		plugins: [
			new TsconfigPathsPlugin({ configFile: './tsconfig.json' })
		]
	},
	plugins: [
		new StylelintPlugin({
			cache: false,
			configFile: path.resolve(__dirname, '.stylelintrc.js'),
			context: path.resolve(__dirname, '/static/css'),
			files: ['**/*.css', './*.css', './view/*.css'],
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
	]
}