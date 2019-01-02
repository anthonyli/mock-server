const Router = require('koa-router')
const appConfig = require('utils/config')
const path = require('path')
const glob = require('glob')

const { apiPrefix, baseURI } = appConfig

// 路由定义
const router = new Router({ prefix: baseURI ? baseURI + apiPrefix : apiPrefix })

const controllersDir = path.join(__dirname, '../controllers/api')
glob
  .sync('**/*.js', {
    cwd: controllersDir
  })
  .forEach(ctrPath => {
    ctrPath = ctrPath.replace(/([/\\])?\.js$/, '')
    const controller = require(path.join(controllersDir, ctrPath))
    router.all('/' + ctrPath, controller)
  })

router.post('/regions/query', async ctx => {
  const path = require('../../../mock/regions/query')

  ctx.body = {
    code: 0,
    data: path.objects
  }
})

module.exports = router
