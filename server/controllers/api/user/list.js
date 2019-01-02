// 获取用户列表
const User = require('daos/user')
module.exports = async ctx => {
  const user = new User()
  const filter = {}

  // filter.id = {
  //   ne: 1
  // }

  const userData = await user.getUserList(filter)

  const data = userData.map(item => {
    const temp = {
      id: item.id,
      userAliasName: item.userAliasName
    }
    return temp
  })

  ctx.body = {
    code: 0,
    data: data
  }
}
