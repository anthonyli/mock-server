const DocumentDaos = require('daos/document')

module.exports = async ctx => {
  const documentDaos = new DocumentDaos()

  const documents = await documentDaos.getDocumentList(ctx)

  ctx.body = { code: 0, data: documents }
}
