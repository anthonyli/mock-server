const CategoryDao = require('daos/category')
module.exports = async ctx => {
  const params = ctx.request.body
  const catagoryDao = new CategoryDao()
  await catagoryDao.delCategory(params)
  ctx.operateLog({
    action: 'DELETE_CATEGORY',
    detail: `{"cagetoryId":${params.id}}`
  })
  ctx.body = { code: 0, data: 'success' }
}
