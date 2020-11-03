# 基于webpack4的多页脚手架

## 注意点

```shell
npm run dev     # 使用 webpack-dev-middleware 插件
npm run start   # 使用 webpack-dev-server
```

## 自动刷新&热更新

- **热更新**：模块热替换功能会在应用程序运行过程中替换、添加或删除模块，无需重新加载整个页面。主要通过下面几种方式加快开发速度：
    - 保留在完全重新加载页面时丢失的应用程序状态
    - 只更新变更内容，以节省宝贵的开发时间
    - 调整样式更加快速 - 几乎相当于在浏览器调试器中更改样式

- **自动刷新**：roload 当前页面

该项目使用默认为自动刷新，如需开启热更新，`/build/webpack.dev.conf.js`：

```js
...
devServer: {
    contentBase: path.join(__dirname, '../src'),
    publicPath: '/',
    host: '127.0.0.1',
    port: '3000',
    hot: true, // 开启热更新
...
```


## TODO

- 生产压缩 css
- postcss-loader 加入。现有问题，配置后再引入 .ts 文件则 css 文件编译不出来。
- 打包之后文件美化
- 打包之后文件嵌套层丢失