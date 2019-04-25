const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.conf');

module.exports = merge(common, {
    output: {
        filename: '[name].[hash:7].js',
        chunkFilename: '[name].[chunkhash:7].js',
        path: path.resolve(__dirname, '../dist'),
    },
    plugins: [
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ]
});