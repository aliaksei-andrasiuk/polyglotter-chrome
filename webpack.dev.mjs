import { merge } from 'webpack-merge';
import common from './webpack.common.mjs';
import Dotenv from 'dotenv-webpack';
import path from 'path';

export default merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        static: './dist',
        hot: true,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new Dotenv({
            path: path.resolve('./env/.env.dev')
        })
    ]
});
