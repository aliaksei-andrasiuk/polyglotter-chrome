import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

function getHtmlPlugins(chunks) {
    return chunks.map(chunk => new HtmlPlugin({
        title: 'React Extension',
        filename: `${chunk}.html`,
        chunks: [chunk]
    }));
}

export default {
    entry: {
        popup: path.resolve('src/Popup/index.tsx'),
        background: path.resolve('src/background/background.ts'),
        contentScript: path.resolve('src/contentScript/index.tsx'),
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.tsx?$/,
                exclude: /node_modules/
            },
            {
                type: 'asset/resource',
                test: /\.(png|jpg|jpeg|gif|woff|woff2|tff|eot|svg)$/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve('src/static/manifest.json'),
                    to: path.resolve('dist/manifest.json')
                },
                {
                    from: path.resolve('_locales'),
                    to: '_locales'
                },
                {
                    from: path.resolve('src/static'),
                    to: path.resolve('dist'),
                    globOptions: {
                        ignore: ['**/manifest.json', '**/_locales/**']
                    }
                }
            ]
        }),
        ...getHtmlPlugins(['popup'])
    ],
    resolve: {
        extensions: ['.tsx', '.js', '.ts']
    },
    output: {
        filename: '[name].js',
        path: path.resolve('dist')
    }
};
