const NamespaceDaos = require('daos/namespace')

module.exports = async ctx => {
  const namespaceDaos = new NamespaceDaos()

  const Spaces = await namespaceDaos.getSpaceList(ctx)

  ctx.body = { code: 0, data: Spaces }
}
