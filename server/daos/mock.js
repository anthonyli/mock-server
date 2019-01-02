module.exports = class {
  async getMockList(opts = {}) {
    const { Permission, Mock } = global.M
    const permission = await Permission.findAll({
      where: {
        uid: opts.userId
      }
    })
    if (!permission.length) {
      return null
    }

    const allMocks = Mock.findAll({
      where: {
        did: opts.did
      }
    })
    return allMocks
  }

  async getMockByDid(opts = {}) {
    const { Mock } = global.M
    return Mock.findOne({
      where: {
        did: opts.did
      }
    })
  }

  updateMock(opts = {}) {
    const { Mock } = global.M
    let content = JSON.stringify(opts.mocks)
    return Mock.update(
      {
        content: content
      },
      {
        where: { did: opts.did }
      }
    )
  }

  createMock(opts = {}) {
    const { Mock } = global.M
    return Mock.create({
      content: opts.data.content,
      title: opts.data.title,
      did: opts.data.did,
      path: opts.data.path
    })
  }

  getProjectDocs(opts = {}) {
    const { Project, Document } = global.M
    return Project.findOne({
      include: [
        {
          model: Document,
          required: false,
          as: 'ApiDoc',
          where: {
            status: 1
          }
        }
      ],
      where: {
        id: opts.pid,
        status: 1
      }
    })
  }
}
