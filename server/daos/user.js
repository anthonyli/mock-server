module.exports = class {
  getUserList(filter) {
    return global.M.User.findAll({
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

  login(params) {
    return global.M.User.findOne({
      where: {
        userName: params.userName
      }
    })
  }
}
