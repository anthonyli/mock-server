const STATUS_ENABLED = 1
const STATUS_DISABLED = 0
const ROLE_OWNER = 1
const ROLE_MEMBER = 2
module.exports = class {
  getProjectList(ctx) {
    const { Namespace, Permission, Project, User, sequelize } = global.M
    const { pageIndex, pageSize } = ctx.query
    const offset = (pageIndex - 1) * pageSize
    const limit = +pageSize
    return sequelize
      .transaction(async t => {
        const spaces = await Namespace.findAll({
          attributes: {},
          include: [
            {
              model: Permission,
              required: false,
              as: 'Permission',
              where: {
                uid: ctx.user.id
              }
            }
          ],
          limit,
          offset,
          where: {
            status: STATUS_ENABLED
          },
          transaction: t
        })

        const spaceIds = spaces.map(p => p.id)

        return Permission.findAll({
          attributes: {
            include: []
          },
          include: [
            {
              model: Project,
              as: 'Project'
            }
          ],
          where: {
            nid: spaceIds
          },
          transaction: t
        })
        // const users = await Permission.findAll({
        //   attributes: {
        //     include: []
        //   },
        //   include: [
        //     {
        //       model: User,
        //       as: 'User'
        //     }
        //   ],
        //   where: {
        //     pid: projectIds
        //   },
        //   transaction: t
        // })

        // return projects.map(project => {
        //   let members = []
        //   let owner
        //   let isOwner = false
        //   users.forEach(pusers => {
        //     pusers = pusers.dataValues
        //     const user = {
        //       userName: pusers.User.userName,
        //       userNickName: pusers.User.userNickName,
        //       userId: pusers.uid
        //     }
        //     if (pusers.pid === project.id) {
        //       pusers.role === ROLE_OWNER ? (owner = user) : members.push(user)
        //       isOwner = isOwner || (pusers.role === ROLE_OWNER && user.userId === ctx.user.id)
        //     }
        //   })

        //   return {
        //     id: project.dataValues.id,
        //     projectName: project.dataValues.projectName,
        //     description: project.dataValues.description,
        //     owner: owner,
        //     members: members,
        //     isOwner
        //   }
        // })
      })
      .then(res => res)
      .catch(res => {
        console.log(res)
      })
  }
  saveNameSpace(ctx) {
    const { Namespace, Permission, sequelize } = global.M
    const opts = ctx.request.body
    let space = {}
    return sequelize
      .transaction(async t => {
        await Permission.destroy({
          where: { nid: opts.nid },
          transaction: t
        })

        if (opts.id) {
          await Namespace.update(
            {
              nameSpace: opts.nameSpace,
              description: opts.description
            },
            {
              where: { id: opts.id },
              transaction: t
            }
          )
        } else {
          space = await Namespace.create(
            {
              nameSpace: opts.nameSpace,
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
        opts.owner.forEach(member => {
          permissionList.push({ nid: space.id || opts.nid, role: ROLE_OWNER, uid: opts.owner })
        })
        opts.members.forEach(member => {
          permissionList.push({ nid: space.id || opts.nid, role: ROLE_MEMBER, uid: member })
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

  deleteNameSpace(id) {
    const { Namespace } = global.M
    return Namespace.update(
      {
        status: STATUS_DISABLED
      },
      {
        where: { id: id }
      }
    )
  }
}
