// https://github.com/shelljs/shelljs
//require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora'); // 命令环境的loading
var path = require('path')
var chalk = require('chalk') // 命令行色彩输出
//var shell = require('shelljs')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.js')

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
/* shell.rm('-rf', assetsPath)
shell.mkdir('-p', assetsPath)
shell.config.silent = true
shell.cp('-R', 'static/*', assetsPath)
shell.config.silent = false */

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('  已生成文件 dist文件夹.\n'))
  console.log(chalk.yellow(
    '  多页项目可以直接在 file:// 下浏览.\n'
  ))
})
