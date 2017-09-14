require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
var ProgressPlugin = require('webpack/lib/ProgressPlugin');

var spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  var compiler = webpack(webpackConfig)
  compiler.apply(new ProgressPlugin(function (percentage, msg, current, active, modulepath) {
    if (process.stdout.isTTY && percentage < 1) {
      process.stdout.cursorTo(0)
      modulepath = modulepath ? (modulepath.length>35 ? modulepath.substring(0, 20) + '...' + modulepath.slice(-10) : modulepath) : ''
      current = current ? ' ' + current : ' '
      active = active ? ' ' + active : ' '
      var percent = chalk.green(('  '+(percentage * 100).toFixed(0)).slice(-3) + '% ')
      process.stdout.write(percent + msg + chalk.green(current + active) + ' ' + modulepath)
      process.stdout.clearLine(1)
    } else if (percentage === 1) {
      process.stdout.moveCursor(0, -1);
      process.stdout.clearLine(1)
      process.stdout.write('\n\n')
    }
  }))
  compiler.run(function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
