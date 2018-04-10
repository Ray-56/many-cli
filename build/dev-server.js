var config = require('../config');
if(!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

var opn = require('opn'); // 打开浏览器
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var proxyMiddleware = require('http-proxy-middleware');
var webpackConfig = require('./webpack.dev');

// dev服务器监听的端口
var port = process.env.PORT || config.dev.port;

// 是否打开默认浏览器
var autoOpenBrowser = !!config.dev.autoOpenBrowser;

// 设置代理
var proxyTable = config.dev.proxyTable;

var app = express();
var compiler = webpack(webpackConfig);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true, // 向控制台显示任何内容
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false,
    heartbeat: 2000
})

// html-webpack-plugin 发生变化时 刷新页面
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({action: 'reload'});
        cb();
    })
})

// proxy 请求
Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context];
    if(typeof options === 'string') {
        options = { target: options }
    };
    app.use(proxyMiddleware(options.filter || context, options));
})

// webpack服务输出
app.use(devMiddleware);

// 使用 hot-reload 和 state-preserving
// 编译错误时的显示
app.use(hotMiddleware);

// 静态资源服务
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

var uri = 'http://localhost:' + port;

var _resolve;
var readyPromise = new Promise(resolve => {
    _resolve = resolve;
})

console.log('>>>>> 启动dev服务');
devMiddleware.waitUntilValid(() => {
    console.log('>>>>> 监听地址' + uri + '\n');
    if(autoOpenBrowser) {
        opn(uri);
    };
    _resolve();
})

var server = app.listen(port);

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close();
    }
}