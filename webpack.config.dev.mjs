import path from 'node:path';
import TerserPlugin from 'terser-webpack-plugin';
import { merge } from 'webpack-merge';
import baseConfig from './webpack.config.base.mjs'; // Assuming base config is also ESM
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
// const path = require('path');
// const TerserPlugin = require('terser-webpack-plugin');
// const { merge } = require('webpack-merge');
// const baseConfig = require('./webpack.config.base.mjs');

//module.exports = merge(baseConfig, {
export default merge(baseConfig, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'src/main/resources/static/dist'),
        },
        watchFiles: {
            paths: [
                path.join(__dirname, './src/main/resources/static/dist/*.js'),
                path.join(__dirname, './src/main/resources/static/dist/*.css'),
            ],
        },
        host: 'localhost',
        port: 4568,
        proxy: {
            '**': {
                target: 'http://localhost:8789',
                secure: false,
            },
        },
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
        moduleIds: 'named',
    },
    performance: {
        hints: false,
    },
});
