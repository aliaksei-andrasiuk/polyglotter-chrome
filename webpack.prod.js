const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
        filename: '[name].css',
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ],
        splitChunks: {
            chunks(chunk) {
                return chunk.name !== 'contentScript';
            }
        },
    },       
});
