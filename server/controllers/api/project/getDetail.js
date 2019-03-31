const ProjectDao = require('daos/project')
const HistoryDao = require('daos/history')
module.exports = async ctx => {
  const query = ctx.query

  const projectDao = new ProjectDao()
  const historyDao = new HistoryDao()
  const project = await projectDao.getProjectDetail({ id: query.pid, userId: 1 }).then(project => {
    if (!project) {
      return Promise.reject(new Error('项目不存在或者已经删除'))
    }
    return project
  })
  historyDao.setHistory(global.M.VisitHistory, {
    username: 'admin',
    pid: project.id
  })

  ctx.body = {
    code: 0,
    data: Object.assign({}, project.dataValues, {
      mockRepository: `http://${ctx.host}/api-doc/project/export/${project.id}`
    })
  }
}
