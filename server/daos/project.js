const STATUS_ENABLED = 1
const STATUS_DISABLED = 0
const ROLE_OWNER = 1
const ROLE_MEMBER = 2
module.exports = class {
  async getProjectList(opts = {}) {
    const { Permission, Project, sequelize } = global.M
    await Permission.findAll({
      attributes: {
        include: [
          [sequelize.col('Project.project_name'), 'name'],
          [sequelize.col('Project.description'), 'desc']
          // [sequelize.fn('count', sequelize.col('Project.ApiDoc.id')), 'apiNums']
        ]
      },
      include: [
        {
          attributes: [],
          model: Project,
          as: 'Project',
          where: {
            status: STATUS_ENABLED
          }
        }
      ],
      group: ['Project.id'],
      where: {
        uid: opts.id
      }
    })
  }
  saveProject(opts = {}, ctx) {
    const { Project, Permission, sequelize } = global.M
    let pro = {}
    return sequelize
      .transaction(async t => {
        await Permission.destroy({
          where: { pid: opts.pid },
          transaction: t
        })

        if (opts.id) {
          await Project.update(
            {
              projectName: opts.projectName,
              description: opts.projectDesc
            },
            {
              where: { id: opts.id },
              transaction: t
            }
          )
        } else {
          pro = await Project.create(
            {
              projectName: opts.projectName,
              description: opts.projectDesc,
              uid: ctx.user.id,
              status: STATUS_ENABLED
            },
            {
              transaction: t
            }
          )
        }
        const permissionList = []
        permissionList.push({ pid: pro.id || opts.pid, role: ROLE_OWNER, uid: ctx.user.id })
        opts.members.forEach(member => {
          permissionList.push({ pid: pro.id || opts.pid, role: ROLE_MEMBER, uid: member })
        })
        await Permission.bulkCreate(permissionList, {
          transaction: t
        })
      })
      .then(res => res)
      .catch(res => {
        console.log(res)
      })
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
}
