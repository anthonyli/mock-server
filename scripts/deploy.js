/* eslint-disable no-console */

'use strict'

const execa = require('execa')
const Promise = require('bluebird')

console.log('start deploying...')

const env = process.env.NODE_ENV || 'development'
console.time('执行时间')
const pkgName = process.env.npm_package_name

Promise.resolve()
  .then(
    Promise.coroutine(function*() {
      // 启动开发服务器
      if (env === 'development') {
        const devServer = `${pkgName}-dev-server`
        yield execa.shell(`pm2 startOrRestart process.json --only ${devServer}`).then(ret => {
          console.log(ret.stdout)
        })
      }

      // 启动 Node 服务
      yield execa.shell(`pm2 startOrRestart process.json --only ${pkgName}-${env}`).then(ret => {
        console.log(ret.stdout)
      })
    })
  )
  .then(() => {
    console.timeEnd('执行时间')
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
