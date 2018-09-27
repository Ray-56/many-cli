# many-cli
多页webpack脚手架

## 功能点
1. 配置`jquery`至全局插件. 
2. 可以使用`sass`.
3. 可以添加静态资源`src/pages/static/`

## 开始
> node version >= 6
1. clone项目到本地
```
https://github.com/guokangf/many-cli.git
```
2. 进入项目`cd many-cli`
3. 安装依赖`npm i`
4. 打开开发环境`npm run dev`
5. 新建页面, 要在`src/pages/`中创建`html`文件, `src/js/`目录下创建与`html`文件相同名称的`js`, 执行`npm run output`, 生成多入口.

## 生产
`npm run build`, 根目录下生成`dist`文件夹.
