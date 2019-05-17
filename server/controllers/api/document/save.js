const DocumentDaos = require('daos/document')

module.exports = async ctx => {
  const documentDaos = new DocumentDaos()

  const { content, id } = ctx.request.body

  const apiDocs = await documentDaos.getDocumentByPid(ctx)

  const samePath = apiDocs.find(
    api =>
      api.path === content.pathName && api.method.toLowerCase() === content.method.toLowerCase()
  )

  if (samePath && id !== samePath.id) {
    throw new Error('该项目下已有相同路径的接口，请检查后重新保存')
  }

  const document = await documentDaos.saveDocument(ctx)

  ctx.body = { code: 0, data: document }
}
