const STATUS_ENABLED = 1
const STATUS_DISABLED = 0
const ROLE_OWNER = 1
const ROLE_MEMBER = 2
module.exports = class {
  getSpaceList(ctx) {
    const { Namespace, Permission, sequelize } = global.M
    return Permission.findAll({
      attributes: [
        [sequelize.col('Namespace.name_space'), 'nameSpace'],
        [sequelize.col('Namespace.description'), 'description'],
        [sequelize.col('Namespace.id'), 'id'],
        [sequelize.fn('count', sequelize.col('Namespace.id')), 'apiNums']
      ],
      include: [
        {
          attributes: [],
          model: Namespace,
          as: 'Namespace',
          where: {
            status: STATUS_ENABLED
          }
        }
      ],
      group: ['Namespace.id'],
      where: {
        uid: ctx.user.id
      }
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
        opts.owner.forEach(owner => {
          permissionList.push({ nid: space.id || opts.nid, role: ROLE_OWNER, uid: owner })
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
