const User = require('daos/user')
module.exports = async ctx => {
  const user = new User()
  const filter = {}
  const { userName } = ctx.query

  if (userName) {
    filter.userName = {
      like: `%${userName}%`
    }
  }

  const userData = await user.getUserList(ctx, filter)

  const data = userData.rows.map(item => {
    const temp = {
      id: item.id,
      userName: item.userName,
      role: item.role,
      userTel: item.userTel,
      email: item.email,
      status: item.status,
      updateTime: item.updateTime
    }
    return temp
  })

  ctx.body = {
    code: 0,
    data: {
      count: userData.count,
      rows: data
    }
  }
}
