const ProjectDao = require('daos/project')
const PermissionDao = require('daos/permission')
module.exports = async ctx => {
  const id = ctx.request.body.id

  const projectDao = new ProjectDao()
  const permissionDao = new PermissionDao()

  await projectDao.deleteProject(id)
  await permissionDao.deletePermission(id)

  ctx.operateLog({
    action: 'DELETE_PROJECT',
    detail: `{"projectId":${id}}`
  })
  ctx.body = { code: 0, data: `deleted project id ${id}` }
}
