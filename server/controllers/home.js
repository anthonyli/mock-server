const { baseURI, appCode, apiPrefix, pageTitle, version } = require('utils/config')
const User = require('daos/user')

const env = process.env.NODE_ENV || 'development'

module.exports = async ctx => {
  const initState = await getInitState(ctx)
  const config = await getConfig(ctx)

  await render(ctx)('index', {
    pageTitle,
    config: JSON.stringify(config),
    initState: JSON.stringify(initState),
    baseURI
  })
}

// 提供给前台 redux 作为初始化 state
async function getInitState(ctx) {
  const user = new User()
  let allUsers = await user.findAll()
  allUsers = allUsers.map(item => {
    return {
      id: item.id,
      userName: item.userName,
      role: item.role,
      userNickName: item.userNickName
    }
  })
  return {
    allUsers,
    user: {
      ...ctx.user
    }
  }
}

// 获取全局配置
async function getConfig(ctx) {
  return {
    // 基础 URI
    baseURI,
    // ajax 请求前缀
    apiPrefix,
    // 系统编号
    appCode,
    pageTitle,
    env,
    version
  }
}

// 优化模板不存在的时候的提示
const render =
  env === 'development'
    ? ctx => {
        return async (...args) => {
          try {
            await ctx.render(...args)
          } catch (e) {
            ctx.body = 'HTML 静态模板编译中，请稍后刷新页面...'
          }
        }
      }
    : ctx => ctx.render
