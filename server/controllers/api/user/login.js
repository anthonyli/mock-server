const User = require('daos/user')
const jwt = require('jsonwebtoken')
const secret = require('utils/secret.json')

const rsaPriv = require('../../../rsa_priv')
const NodeRSA = require('node-rsa')
const prikey = new NodeRSA(rsaPriv)
prikey.setOptions({ encryptionScheme: 'pkcs1' })

const expireDate = day => {
  let date = new Date()
  date.setTime(date.getTime() + day * 86400000)
  return date
}

module.exports = async ctx => {
  const user = new User()

  const { userPassword } = ctx.request.body

  const userData = await user.login(ctx.request.body)

  const pwd = prikey.decrypt(userPassword, 'utf8')

  // 判断用户是否存在
  if (userData) {
    // 判断前端传递的用户密码是否与数据库密码一致
    if (userData.userPassword === pwd) {
      // 用户token
      const userToken = {
        userName: userData.userName,
        userNickName: userData.userNickName,
        role: userData.role,
        id: userData.id
      }
      ctx.user = { ...userToken }
      const token = jwt.sign(userToken, secret.sign, { expiresIn: '7 days' }) // 签发token
      ctx.cookies.set('_m_token', 'Bearer ' + token, {
        expires: expireDate(7),
        httpOnly: true
      })
      ctx.body = {
        code: 0,
        data: {
          user: userToken,
          token
        }
      }
    } else {
      ctx.body = {
        code: 1,
        error: '用户名或密码错误'
      }
    }
  } else {
    ctx.body = {
      code: 1,
      error: '用户名不存在'
    }
  }
}
