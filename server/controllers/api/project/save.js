const ProjectDaos = require('daos/project')

module.exports = async ctx => {
  const projectDaos = new ProjectDaos()

  const projects = await projectDaos.saveProject(ctx)

  ctx.body = { code: 0, data: projects }
}
