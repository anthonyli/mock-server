const STATUS_ENABLED = 1
const STATUS_DISABLED = 0
const ROLE_OWNER = 1
const ROLE_MEMBER = 2
module.exports = class {
  async getProjectList(ctx) {
    const { Permission, Project, sequelize } = global.M
    return Permission.findAll({
      attributes: {
        include: [[sequelize.fn('count'), 'count']]
      },
      include: [
        {
          model: Project,
          as: 'Project',
          required: false,
          where: {
            status: STATUS_ENABLED
          }
        }
      ],
      group: ['Project.id'],
      where: {
        uid: ctx.user.id
      }
    })
  }
  saveProject(ctx) {
    const { Project, Permission, sequelize } = global.M
    const opts = ctx.request.body
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
              description: opts.description
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
              description: opts.description,
              uid: ctx.user.id,
              status: STATUS_ENABLED
            },
            {
              transaction: t
            }
          )
        }
        const permissionList = []
        permissionList.push({ pid: pro.id || opts.pid, role: ROLE_OWNER, uid: opts.owner })
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
