const STATUS_ENABLED = 1
const STATUS_DISABLED = 0
module.exports = class {
  getDocumentList(ctx) {
    const { Document } = global.M
    const { pageIndex, pageSize, pid } = ctx.query
    const offset = (pageIndex - 1) * pageSize
    const limit = +pageSize
    return Document.findAndCountAll({
      where: {
        pid: pid,
        status: STATUS_ENABLED
      },
      limit,
      offset
    })
      .then(res => {
        return res
      })
      .catch(res => {
        console.log(res)
      })
  }
  getDocumentById(id) {
    const { Document } = global.M
    return Document.findOne({
      where: {
        id: id,
        status: 1
      }
    })
  }

  getDocumentByPid(pid) {
    const { Document } = global.M
    return Document.findAll({
      where: {
        pid: pid,
        status: 1
      }
    })
  }

  async saveDocument(opts = {}) {
    const { Document } = global.M
    if (opts.id) {
      let oldDoc = await Document.findOne({
        where: { id: opts.id }
      })
      let backDoc = oldDoc.dataValues
      backDoc.id = null
      backDoc.status = 0
      return Promise.all([
        Document.update(
          {
            title: opts.title,
            content: JSON.stringify(opts.content),
            categoryId: opts.categoryId,
            author: opts.author,
            status: 1
          },
          {
            where: { id: opts.id }
          }
        ),
        Document.create(backDoc)
      ])
    } else {
      return Document.create({
        pid: opts.pid,
        title: opts.title,
        author: opts.author,
        categoryId: opts.categoryId,
        content: JSON.stringify(opts.content),
        status: 1
      })
    }
  }

  moveCategory(opts = {}) {
    const { Document } = global.M
    return Document.update(
      {
        categoryId: opts.newCategoryId,
        author: opts.author,
        status: 1
      },
      {
        where: { id: opts.id }
      }
    )
  }

  deleteDocument(id) {
    const { Document } = global.M
    return Document.update(
      {
        status: STATUS_DISABLED
      },
      {
        where: { id: id }
      }
    )
  }

  async getDocumentHistory(id) {
    const { Document, OperateLog } = global.M
    const operateLog = await OperateLog.findAll({
      where: {
        action: 'UPDATE_DOCUMENT',
        detail: {
          like: `{"documentId":${id},"backUpId":%`
        }
      }
    })
    const backupIds = operateLog.map(log => {
      const logDetail = JSON.parse(log.get('detail'))
      return logDetail.backUpId
    })
    return Document.findAll({
      where: {
        id: backupIds
      },
      order: [['updatedTime', 'DESC']]
    })
  }

  async batchSaveDocument(params, categories) {
    const { Document } = global.M
    const docs = params.docs
      .map(c => {
        const category = categories.find(sc => sc.name === c.category)
        return c.apis.map(api => {
          return {
            title: api.title,
            status: 1,
            pid: params.pid,
            categoryId: category.id,
            author: params.author,
            content: JSON.stringify(api)
          }
        })
      })
      .reduce((a, b) => a.concat(b))

    await Document.update(
      {
        status: 0
      },
      {
        where: {
          title: docs.map(d => d.title),
          pid: params.pid
        }
      }
    )

    return Document.bulkCreate(docs)
  }
}
