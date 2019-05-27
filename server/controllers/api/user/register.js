const User = require('daos/user')
const rsaPriv = require('../../../rsa_priv')
const NodeRSA = require('node-rsa')
const prikey = new NodeRSA(rsaPriv)
prikey.setOptions({ encryptionScheme: 'pkcs1' })

module.exports = async ctx => {
  const user = new User()

  const { userPassword } = ctx.request.body

  const pwd = prikey.decrypt(userPassword, 'utf8')

  ctx.request.body.userPassword = pwd

  const userData = await user.validation(ctx.request.body)

  // 判断用户是否存在
  if (!userData) {
    const userDataReg = await user.register(ctx)

    ctx.body = {
      code: 0,
      data: userDataReg
    }
  } else {
    ctx.body = {
      code: 1,
      error: '用户名已存在'
    }
  }
}
