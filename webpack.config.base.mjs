import path from 'node:path';
import StylelintPlugin from 'stylelint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
// const path = require('path');
// const StylelintPlugin = require('stylelint-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

/**
 * development
 * cheap-module-source-map
 * 프로덕션 배포시 =
 * mdoe : production
 * devtool 제거
 */
//module.exports = {
export default {
    entry: {
        pageRenderer: './view/page/page.tsx',
        dashboardRenderer: './view/page/dashboard.tsx',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'src/main/resources/static/dist'),
        publicPath: '/dist/',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: ['ts-loader'],
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
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                minimize: true,
                            },
                            sourceMap: true,
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[contenthash].[ext]',
                    },
                },
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-inline-loader',
                        options: { classPrefix: true, idPrefix: true },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx', '.css'],
        alias: {
            '@svg': path.resolve(__dirname, './view/svg'),
            '@components': path.resolve(__dirname, './view/components'),
            '@container': path.resolve(__dirname, './view/container'),
            '@wrapper': path.resolve(__dirname, './view/wrapper'),
            '@handler': path.resolve(__dirname, './view/handler'),
            '@image/*': path.resolve(__dirname, './view/image'),
            '@type/*': path.resolve(__dirname, './view/type'),
            '@root': path.resolve(__dirname, './view'),
        },
        plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
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
            chunkFilename: '[id].css',
        }),
    ],
};
