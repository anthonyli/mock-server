const NamespaceDaos = require('daos/namespace')

module.exports = async ctx => {
  const namespaceDaos = new NamespaceDaos()

  const Spaces = await namespaceDaos.saveNameSpace(ctx)

  ctx.body = { code: 0, data: Spaces }
}
