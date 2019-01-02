const sequelize = require('sequelize')
module.exports = class {
  getHistory(HistoryModel, ProjectModel, opts = {}) {
    const projectWhere = { status: 1 }
    if (opts.projectName) {
      projectWhere.projectName = { $like: `%${opts.projectName}%` }
    }
    return HistoryModel.findAll({
      attributes: {
        include: [
          [sequelize.col('Project.project_name'), 'projectName'],
          [sequelize.col('Project.description'), 'description']
        ]
      },
      include: [
        {
          model: ProjectModel,
          as: 'Project',
          attributes: [],
          required: true,
          where: projectWhere
        }
      ],
      where: {
        username: opts.username
      },
      limit: 10,
      order: [['updatedTime', 'DESC']]
    })
  }

  setHistory(HistoryModel, opts = {}) {
    return HistoryModel.create({
      username: opts.username,
      pid: opts.pid
    })
  }

  deleteHistory(HistoryModel, opts = {}) {
    return HistoryModel.destroy({
      where: {
        username: opts.username,
        pid: opts.pid
      }
    })
  }
}
