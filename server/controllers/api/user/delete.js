const User = require('daos/user')
module.exports = async ctx => {
  const user = new User()

  const userData = await user.deleteUser(ctx)

  ctx.body = {
    code: 0,
    data: userData
  }
}
