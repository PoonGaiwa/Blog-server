/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-09 15:09:01
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-13 15:37:55
 * @FilePath: \myBlog_server\core\rsaControl.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: gaiwa gaiwa@163.com
 * @Date: 2023-09-27 15:39:55
 * @LastEditors: gaiwa gaiwa@163.com
 * @LastEditTime: 2023-09-28 17:51:10
 * @FilePath: \express\myBlog\core\rsaControl.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const fsSync = require('fs')
const { pubKeyPath, priKeyPath } = require('../config')
const { generateKeys } = require('./util/util')

module.exports = {
  getPublicKeySync() {
    let key
    try {
      key = fsSync.readFileSync(pubKeyPath, 'utf8')
    } catch (err) {
      generateKeys()
      key = fsSync.readFileSync(pubKeyPath, 'utf8')
    }
    return key
  },
  getPublicKey() {
    let key
    try {
      key = fsSync.readFileSync(pubKeyPath, 'utf8')
    } catch (err) {
      generateKeys()
      key = fsSync.readFileSync(pubKeyPath, 'utf8')
    }
    return key
  },
  getPrivateKey() {
    let key
    try {
      key = fsSync.readFileSync(priKeyPath, 'utf8')
    } catch (err) {
      generateKeys()
      key = fsSync.readFileSync(priKeyPath, 'utf8')
    }
    return key
  }
}