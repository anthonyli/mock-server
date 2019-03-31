const ProjectDao = require('daos/project')
const PermissionDao = require('daos/permission')
const CategoryDao = require('daos/category')
module.exports = async ctx => {
  const params = ctx.request.body
  params.id = parseInt(params.id)
  const projectDao = new ProjectDao()
  const permissionDao = new PermissionDao()
  const categoryDao = new CategoryDao()

  const project = await projectDao.saveProject(Object.assign({}, params, { author: 'admin' }))
  if (!params.id) {
    // 新创建的项目，创建一个默认分组
    await categoryDao.saveCategory({ pid: project.id, name: '默认分组' })
  }
  const postMembers = params.members || []
  const groups = postMembers.filter(m => m.startsWith('G')).map(m => m.replace('G', ''))

  let members = postMembers.filter(m => !m.startsWith('G')).map(m => parseInt(m, 10))

  const groupMembers = await permissionDao
    .getProjectMembers(groups)
    .then(res => res.filter(u => u.role === 2).map(u => u.uid))

  members = [...new Set(members.concat(groupMembers))]
  await permissionDao.savePermission({
    pid: params.id || project.id,
    owner: params.owner,
    members: members || []
  })

  ctx.operateLog({
    action: params.id ? 'UPDATE_PROJECT' : 'CREATE_PROJECT',
    detail: JSON.stringify(params.id ? params : project)
  })
  ctx.body = { code: 0, data: { projectId: params.id || project.id } }
}
