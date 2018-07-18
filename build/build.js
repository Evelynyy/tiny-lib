'use strict'
require('./check-versions')() // 调用检查版本的文件

process.env.NODE_ENV = 'production' // 设置当前是生产环境

// 下面是定义常量引入插件
const ora = require('ora') // 加载动画
const rm = require('rimraf') // 删除文件
const path = require('path') 
const chalk = require('chalk') // 对文案输出的一个彩色设置
const webpack = require('webpack')
const config = require('../config') // 默认读取下面的 index.js 文件
const webpackConfig = require('./webpack.prod.conf')

// 调用 start 的方法实现加载动画，优化用户体验
const spinner = ora('building for production...')
spinner.start()

// 先删除 dist 文件再生成新文件，因为有时候会使用 hash 来命名，删除整个文件可避免冗余
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
