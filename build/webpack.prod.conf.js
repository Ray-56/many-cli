const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.conf');

module.exports = merge(common, {
    output: {
        filename: './js/[name].[hash:7].js',
        chunkFilename: '[name].[chunkhash:7].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: './'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new UglifyJSPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ]
});