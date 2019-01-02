const STATUS_ENABLED = 1
const STATUS_DISABLED = 0
module.exports = class {
  async getProjectDetail(opts = {}) {
    const { Project, Document, Category, Permission, sequelize } = global.M
    const permission = await Permission.findAll({
      where: {
        pid: opts.id,
        uid: opts.userId
      }
    })
    if (!permission.length) {
      return null
    }
    return Project.findOne({
      include: [
        {
          model: Category,
          as: 'Category',
          required: false,
          where: {
            status: STATUS_ENABLED
          },
          include: [
            {
              model: Document,
              required: false,
              as: 'ApiDoc',
              where: {
                status: STATUS_ENABLED
              }
            }
          ]
        }
      ],
      where: {
        id: opts.id,
        status: STATUS_ENABLED
      },
      order: [[sequelize.col('Category.id'), 'ASC']]
    })
  }
  getProjectName(opts = {}) {
    const { Project } = global.M
    return Project.findOne({
      attributes: ['projectName', 'id'],
      where: {
        id: opts.id
      }
    })
  }

  saveProject(opts = {}) {
    const { Project } = global.M
    if (opts.id) {
      return Project.update(
        {
          projectName: opts.projectName,
          description: opts.projectDesc,
          author: opts.author
        },
        {
          where: { id: opts.id }
        }
      )
    } else {
      return Project.create({
        projectName: opts.projectName,
        description: opts.projectDesc,
        author: opts.author,
        status: STATUS_ENABLED
      })
    }
  }

  deleteProject(id) {
    const { Project } = global.M
    return Project.update(
      {
        status: STATUS_DISABLED
      },
      {
        where: { id: id }
      }
    )
  }

  getProjectDocs(opts = {}) {
    const { Project, Document } = global.M
    return Project.findOne({
      include: [
        {
          model: Document,
          required: false,
          as: 'ApiDoc',
          where: {
            status: 1
          }
        }
      ],
      where: {
        id: opts.pid,
        status: 1
      }
    })
  }
}
