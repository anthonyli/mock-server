const STATUS_ENABLED = 1
const STATUS_DISABLED = 0
const ROLE_OWNER = 1
const ROLE_MEMBER = 2
module.exports = class {
  getProjectList(ctx) {
    const { Permission, Project, User, sequelize } = global.M
    const { pageIndex, pageSize, nid } = ctx.query
    const offset = (pageIndex - 1) * pageSize
    const limit = +pageSize
    return sequelize
      .transaction(async t => {
        const projects = await Permission.findAll({
          attributes: [
            [sequelize.col('Project.project_name'), 'projectName'],
            [sequelize.col('Project.description'), 'description'],
            [sequelize.col('Project.id'), 'id'],
            [sequelize.fn('count', sequelize.col('Project.id')), 'apiNums']
          ],
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
          limit,
          offset,
          group: ['Project.id'],
          where: {
            nid: Number(nid),
            uid: ctx.user.id
          },
          transaction: t
        })

        const projectIds = projects.map(p => p.id)

        const users = await Permission.findAll({
          attributes: {
            include: []
          },
          include: [
            {
              model: User,
              as: 'User'
            }
          ],
          where: {
            pid: projectIds
          },
          transaction: t
        })

        return projects.map(project => {
          let members = []
          let owner
          let isOwner = false
          users.forEach(pusers => {
            pusers = pusers.dataValues
            const user = {
              userName: pusers.User.userName,
              userNickName: pusers.User.userNickName,
              userId: pusers.uid
            }
            if (pusers.pid === project.id) {
              pusers.role === ROLE_OWNER ? (owner = user) : members.push(user)
              isOwner = isOwner || (pusers.role === ROLE_OWNER && user.userId === ctx.user.id)
            }
          })

          return {
            id: project.dataValues.id,
            projectName: project.dataValues.projectName,
            description: project.dataValues.description,
            owner: owner,
            members: members,
            isOwner
          }
        })
      })
      .then(res => {
        console.log(res)
        return res
      })
      .catch(res => {
        console.log(res)
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
        opts.owner.forEach(owner => {
          permissionList.push({
            pid: pro.id || opts.pid,
            role: ROLE_OWNER,
            uid: owner,
            nid: opts.nid
          })
        })
        opts.members.forEach(member => {
          permissionList.push({
            pid: pro.id || opts.pid,
            role: ROLE_MEMBER,
            uid: member,
            nid: opts.nid
          })
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
