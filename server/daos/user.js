const STATUS_ENABLED = 1
const ROLE_OWNER = 1

module.exports = class {
  getUserList(ctx, filter) {
    const { User } = global.M
    const { pageIndex, pageSize } = ctx.query
    const offset = (pageIndex - 1) * pageSize
    const limit = +pageSize
    return User.findAndCountAll({
      limit,
      offset,
      where: {
        ...filter
      }
    })
  }

  findAll() {
    const { User } = global.M
    return User.findAll()
  }

  getUserById(userName) {
    return global.M.User.findOne({
      where: {
        userName
      }
    })
  }

  register(ctx) {
    const { User, sequelize, Permission, Namespace } = global.M
    const opts = ctx.request.body

    return sequelize
      .transaction(async t => {
        const user = await User.create(
          {
            userName: opts.userName,
            userNickName: opts.userNickName,
            userPassword: opts.userPassword,
            role: 2
          },
          {
            transaction: t
          }
        )
        const space = await Namespace.create(
          {
            nameSpace: '个人空间',
            description: '',
            uid: user.id,
            type: 1,
            status: STATUS_ENABLED
          },
          {
            transaction: t
          }
        )
        const permissionList = []
        permissionList.push({ nid: space.id, role: ROLE_OWNER, uid: user.id })
        await Permission.bulkCreate(permissionList, {
          transaction: t
        })
        return user
      })
      .then(res => res)
      .catch(res => {
        console.log(res)
      })
  }

  login(params) {
    return global.M.User.findOne({
      where: {
        userName: params.userName
      }
    })
  }
}
