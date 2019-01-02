module.exports = class {
  saveCategory(category) {
    const { Category } = global.M
    category.status = 1
    if (category.id) {
      return Category.update(
        {
          name: category.name
        },
        { where: { id: category.id } }
      )
    }
    return Category.create(category)
  }

  async batchSaveCategory(params) {
    const { Category } = global.M
    const saveList = params.docs.map(c => {
      return { name: c.category, status: 1, pid: params.pid }
    })
    await Category.update(
      {
        status: 0
      },
      {
        where: {
          name: saveList.map(c => c.name),
          pid: params.pid
        }
      }
    )
    await Category.bulkCreate(saveList)
    return Category.findAll({
      where: {
        name: saveList.map(c => c.name),
        pid: params.pid,
        status: 1
      }
    })
  }
  async projectIdGetCategory(params) {
    const { Category, sequelize } = global.M
    return Category.findAll({
      where: {
        pid: params.pid,
        status: 1
      },
      order: [[sequelize.col('Category.id'), 'ASC']]
    })
  }

  delCategory(opts = {}) {
    const { Category, Document } = global.M
    return Promise.all([
      Category.update(
        {
          status: 0
        },
        { where: { id: opts.id } }
      ),
      Document.update(
        {
          status: 0
        },
        {
          where: { categoryId: opts.id }
        }
      )
    ])
  }
}
