const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')


module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        static: './dist',
        hot: true,
        open: true,
    },
    module: {
        rules: [
        {
            test: /\.scss$/i,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        ],
    },
});
