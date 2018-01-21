const merge = require('webpack-merge');
const base = require('./webpack.base.js');

module.exports = merge(base, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './',
        host: 'localhost',
        compress: true,
        port: 3000,
        inline: true
    }
})