require('app-module-path/register')

const Promise = require('bluebird')

Promise.config({
  warnings: false,
  longStackTraces: true
})

global.Promise = Promise

const path = require('path')
const Koa = require('koa')
const koabody = require('koa-body')
const favicon = require('koa-favicon')
const jwt = require('koa-jwt')

const secret = require('./utils/secret.json')
const config = require('./utils/config')

global.M = require('./models')(config.dbOption)

const checkToken = require('./middlewares/check-token')
const healthCheck = require('./middlewares/health-check')
const tplRender = require('./middlewares/tpl-render')

const pkg = require('../package.json')

const router = require('./router')

const app = new Koa()
const isDev = app.env === 'development'
const port = config.server.port

app.name = pkg.name

app.use(healthCheck())

app.use(favicon(path.join(__dirname, '../client/assets/images/icon.png')))
// 日志
app.use(
  koabody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, './uploads')
    }
  })
)

// view
app.use(tplRender(isDev))

// 需要开启 静态资源
const staticServer = require('koa-static-cache')

app.use(
  staticServer(path.join(__dirname, '../build'), {
    maxage: 3600 * 24 * 30,
    gzip: true
  })
)

app.use(checkToken())

app.use(
  jwt({ secret: secret.sign }).unless({
    path: [/^(?!\/mapi\/api)/, /^\/mapi\/api\/user\/login/]
  })
)

// 路由配置
app.use(router.routes(), router.allowedMethods())

// 启动服务
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
