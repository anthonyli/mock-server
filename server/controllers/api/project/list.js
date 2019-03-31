const PermissionDao = require('daos/permission')
module.exports = async ctx => {
  const permissionDao = new PermissionDao()
  const user = {
    id: 1,
    nickname: 'admin',
    nicknameCN: 'admin'
  }
  const projects = await permissionDao.getProjectList(user)

  ctx.body = { code: 0, data: projects }
}
