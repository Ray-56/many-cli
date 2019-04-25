const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.conf');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: path.join(__dirname, '../src'),
        publicPath: '/',
        host: '127.0.0.1',
        port: '3000',
        overlay: true, // 浏览页面上显示错误
        open: true, // 开启浏览器
        stats: 'errors-only',
        // hot: true, // 开启热更新
        proxy: {}
    }
});