const ROLE_OWNER = 1
const ROLE_MEMBER = 2
module.exports = class {
  async getProjectList(opts = {}) {
    const { Permission, Project, User, Document, sequelize } = global.M
    const projects = await Permission.findAll({
      attributes: {
        include: [
          [sequelize.col('Project.project_name'), 'name'],
          [sequelize.col('Project.description'), 'desc'],
          [sequelize.fn('count', sequelize.col('Project.ApiDoc.id')), 'apiNums']
        ]
      },
      include: [
        {
          attributes: [],
          model: Project,
          as: 'Project',

          include: [
            {
              model: Document,
              required: false,
              as: 'ApiDoc',
              where: {
                status: 1
              },
              attributes: []
            }
          ],
          where: {
            status: 1
          }
        }
      ],
      group: ['Project.id'],
      where: {
        uid: opts.id
      }
    })

    const projectIds = projects.map(p => p.pid)

    return Permission.findAll({
      attributes: {
        include: [
          [sequelize.col('User.username'), 'username'],
          [sequelize.col('User.nickname_cn'), 'nicknameCN']
        ]
      },
      include: [
        {
          attributes: [],
          model: User,
          as: 'User'
        }
      ],
      where: {
        pid: projectIds
      }
    }).then(res => {
      return projects
        .map(project => {
          let members = []
          let owner
          let isOwner = false
          res.forEach(permission => {
            permission = permission.dataValues
            const user = {
              username: permission.username,
              nicknameCN: permission.nicknameCN,
              userId: permission.uid
            }
            if (permission.pid === project.pid) {
              permission.role === ROLE_OWNER ? (owner = user) : members.push(user)
              isOwner = isOwner || (permission.role === ROLE_OWNER && user.userId === opts.id)
            }
          })

          return {
            id: project.dataValues.pid,
            apiNums: project.dataValues.apiNums,
            projectName: project.dataValues.name,
            projectDesc: project.dataValues.desc,
            owner: owner,
            members: members,
            isOwner
          }
        })
        .filter(project => !!project)
    })
  }

  async savePermission(opts = {}) {
    const { Permission } = global.M
    await Permission.destroy({
      where: { pid: opts.pid }
    })
    const permissionList = []
    permissionList.push({ pid: opts.pid, role: ROLE_OWNER, uid: opts.owner })
    opts.members.forEach(member => {
      permissionList.push({ pid: opts.pid, role: ROLE_MEMBER, uid: member })
    })
    return Permission.bulkCreate(permissionList)
  }

  deletePermission(pid) {
    const { Permission } = global.M
    return Permission.destroy({
      where: { pid: pid }
    })
  }

  getProjectMembers(pid) {
    const { Permission, User, sequelize } = global.M
    return Permission.findAll({
      attributes: {
        include: [
          [sequelize.col('User.username'), 'username'],
          [sequelize.col('User.nickname_cn'), 'nicknameCN']
        ]
      },
      include: [
        {
          attributes: [],
          model: User,
          as: 'User'
        }
      ],
      where: {
        pid: pid
      }
    })
  }
}
