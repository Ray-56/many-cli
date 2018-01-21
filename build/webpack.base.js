const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const utils = require('../config/utils');
const config = require('../config');
const entryFiles = require('../config/entrys'); // 获取所有入口文件配置

function resolve(dir) {
    return path.join(__dirname, '.', dir)
};

module.exports = {
    entry: entryFiles,
    output: {
        filename: 'static/js/[name].[hash].js',
        chunkFilename: 'static/js/[id].chunk.js',
        path: path.join(__dirname, '../dist'),
        // publicPath 上线替换真实的http,如果设置为/则需把dist下的文件放在项目的根目录
        // publicPath:'http://localhost:3000/'
        publicPath: process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            chunks: [ 'page1' ], // 提取公用模块
            minChunks: Infinity
        }),
        new ExtractTextPlugin({
            // 生成css文件名
            filename: 'static/css/[name].css',
            disable: false,
            allChunks: true
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true //css压缩
                            }
                        }
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.html$/,
                loader: 'html-loader?attrs=img:src img:data-src'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[ext]')
                }
            }
        ]
    },
}