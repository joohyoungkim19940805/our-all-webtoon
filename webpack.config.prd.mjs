import path from 'node:path';
import TerserPlugin from 'terser-webpack-plugin';
import { merge } from 'webpack-merge';
import baseConfig from './webpack.config.base.mjs'; // Assuming base config is also ESM

// const TerserPlugin = require('terser-webpack-plugin');
// const { merge } = require('webpack-merge');
// const baseConfig = require('./webpack.config.base');

//module.exports = merge(baseConfig, {
export default merge(baseConfig, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimize: true,
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
        hints: false,
    },
});
