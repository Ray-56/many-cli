const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// express使用webpack-dev-middleware中间件并且使用webpack.config.js的参数
// 配置文件作为基础
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

// 启动服务
app.listen(3000, () => {
    console.log('App listening on port 3000!');
});