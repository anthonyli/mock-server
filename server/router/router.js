const Router = require('koa-router')
const appConfig = require('utils/config')
const path = require('path')
const glob = require('glob')
const axios = require('axios')

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
  const path = require('../../mock/regions/query')

  ctx.body = {
    code: 0,
    data: path.objects
  }
})

router.post('/regions/query', async ctx => {
  const params = ctx.request.body
  const data = await axios.get(`https://api.weibo.com/2/short_url/shorten.json${ctx.path}`, params)
  ctx.body = data.data
})

module.exports = router
