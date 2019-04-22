const User = require('daos/user')
module.exports = async ctx => {
  const user = new User()

  const userData = await user.login(ctx.request.body)

  // 判断用户是否存在
  if (!userData) {
    const userData = await user.register(ctx)

    ctx.body = {
      code: 0,
      data: userData
    }
  } else {
    ctx.body = {
      code: 1,
      error: '用户名已存在'
    }
  }
}
