const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
    ]
})