const CategoryDao = require('daos/category')
module.exports = async ctx => {
  const params = ctx.request.body
  const categoryDao = new CategoryDao()
  const category = await categoryDao.saveCategory(params)
  ctx.operateLog({
    action: params.id ? 'UPDATE_CATEGORY' : 'CREATE_CATEGORY',
    detail: JSON.stringify(params.id ? params : category)
  })
  ctx.body = { code: 0, data: { message: 'success', id: params.id || category.id } }
}
