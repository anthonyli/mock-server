const NodeRSA = require('node-rsa')
const newkey = new NodeRSA({ b: 1024 })
newkey.setOptions({ encryptionScheme: 'pkcs1' }) // 因为jsencrypt自身使用的是pkcs1加密方案,只有从后台改咯

let public_key = newkey.exportKey('pkcs8-public') // 公钥,
let private_key = newkey.exportKey('pkcs8-private') // 私钥

console.log({ a: public_key, b: private_key })

let pubkey = new NodeRSA(public_key)
let prikey = new NodeRSA(private_key)
pubkey.setOptions({ encryptionScheme: 'pkcs1' }) // 因为jsencrypt自身使用的是pkcs1加密方案,只有从后台改咯
prikey.setOptions({ encryptionScheme: 'pkcs1' }) // 因为jsencrypt自身使用的是pkcs1加密方案,只有从后台改咯
// 	   	加密 	&&	  解密方法
// let encrypted = pubkey.encrypt(yourstring, 'base64')
// let decrypted = prikey.decrypt(encrypted, 'utf8')
