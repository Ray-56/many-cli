const webpack = require('webpack');
const config = require('../config');
const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(base, {
    devtool: 'scouce-map',
    plugins: [
        new CleanWebpackPlugin(['./dist']),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        /* new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.CommonsChunkPlugin({
              name: 'common', // 指定公共 bundle 的名称。
        }) */
        // 静态资源打包时 合并至dist中
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../src/pages/static'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ]
})