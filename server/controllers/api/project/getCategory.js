const CategoryDao = require('daos/category')
module.exports = async ctx => {
  const params = ctx.query
  const categoryDao = new CategoryDao()
  const category = await categoryDao.projectIdGetCategory(params)
  ctx.body = { code: 0, data: category }
}
