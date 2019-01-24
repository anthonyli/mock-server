/* eslint-disable no-console */

'use strict'

const path = require('path')
const fs = require('fs-extra')
const ip = require('dev-ip')
const glob = require('glob')
const yaml = require('js-yaml')
const webpack = require('webpack')
const Promise = require('bluebird')

Promise.promisifyAll(fs)

console.log('start compiling...')

let env = process.env.NODE_ENV || 'development'

console.log(`using ${env} config`)

const devIp = ip()[0]
const root = path.join(__dirname, '..')
const viewsPath = path.join(root, 'server/views')
const configPath = path.join(root, `config/webpack.config.${env}`)
const appConfigPath = path.join(root, 'config/app.yaml')

const config = require(configPath)
const appConfig = yaml.safeLoad(fs.readFileSync(appConfigPath))
const serverConfig = appConfig.server

const buildPath = config.output.path

console.time('执行时间')

Promise.resolve()
  .then(() => {
    console.log('clean views and build path')

    // 清理 views && output.path
    return Promise.all([fs.removeAsync(viewsPath), fs.removeAsync(buildPath)])
  })
  .then(() => {
    console.log('update process.json')

    return Promise.resolve()
  })
  .then(() => {
    console.log('webpack building...')

    const devPort = serverConfig.devPort

    if (env === 'development') {
      config.output.publicPath = `http://${devIp}:${devPort}/build/`
    }

    // webpack 编译
    return new Promise((resolve, reject) => {
      webpack(config, (err, stats) => {
        if (err || stats.hasErrors()) {
          console.log(
            stats.toString({
              colors: true,
              timings: true,
              hash: true,
              version: true,
              errorDetails: true,
              assets: false,
              chunks: false,
              children: false,
              modules: false,
              chunkModules: false
            })
          )

          return reject(err)
        }
        console.timeEnd('执行时间')
        console.time('上传时间')
        resolve()
      })
    })
  })
  .then(() => {
    console.log('move views template')

    // 移动模版文件
    const templates = glob.sync('*.html', {
      cwd: buildPath
    })

    return Promise.map(templates, template => {
      const srcPath = path.join(buildPath, template)
      const distPath = path.join(viewsPath, template)

      return fs.moveAsync(srcPath, distPath, {
        clobber: true
      })
    })
  })
  .then(() => {
    console.log('publishing static assets...')

    // 发布静态资源
    return Promise.resolve()
  })
  .then(() => {
    console.timeEnd('上传时间')
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
