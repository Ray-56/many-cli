const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const config = require('../config');

// 将热加载相关条目加载到目录中
Object.keys(base.entry).forEach(function(name) {
    base.entry[name] = ['./build/dev-client'].concat(base.entry[name]);
})

module.exports = merge(base, {
    devtool: '#cheap-module-eval-source-map',
    devServer: {
        contentBase: './',
        host: 'localhost',
        compress: true,
        port: 3000,
        inline: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
})