const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getEntry = require('./getEntry');

const entry = getEntry();
module.exports = {
    // entry: {
    //     app: './src/index.ts',
    // },
    entry: entry,
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, '../dist'),
    },
    resolve: {
        extensions:['.ts', '.tsx', '.js', '.jsx'],
        modules: [
            path.resolve(__dirname, '../src'),
            path.resolve('node_modules'),
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'all',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    // minSize: 0, // 文件最小打包体积，单位byte，默认30000。会将 console 剔除
                },
                vendor: { // 提出第三方模块
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10, // 优先
                    enforce: true,
                }
            }
        },

    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // title: 'Prodoction',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
        })
        // new webpack.optimize.RuntimeChunkPlugin({
        //     name: 'common'
        // })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.json$/,
                use: [
                    'json-loader'
                ]
            }
        ]
    }
}

const htmlArray = [];
Object.keys(entry).forEach(ele => {
    htmlArray.push({
        _html: ele,
        title: '',
        chunks: ['vendor', 'common', ele]
    });
});

function getHtmlConfig(name, chunks) {
    return {
        template: `./src/pages/${name}/index.html`,
        filename: `${name}.html`,
        inject: true,
        hash: false,
        chunks: chunks,
        minify: process.env.NODE_ENV !== 'production' ? false : {
            removeComments: true, // 移除 html 中的注释
            collapseWhitespace: true, // 折叠空白区域，压缩代码
            removeAttributeQuotes: true, // 去除属性引用
        }
    }
}

htmlArray.forEach(({ _html, chunks }) => {
    module.exports.plugins.push(
        new HtmlWebpackPlugin(getHtmlConfig(_html, chunks))
    );
});