/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-09 15:09:01
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-13 18:23:48
 * @FilePath: \myBlog_server\core\sendToken.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const jwt = require('jsonwebtoken')
const { getPrivateKey } = require('../core/rsaControl')

module.exports = {
  async sendToken(userInfo) {
    let { username, _id } = userInfo
    let token = jwt.sign({
      user_name: username,
      user_id: _id,
      exp: ~~((Date.now() / 1000) + 24 * 3600 * 3)
    }, getPrivateKey(), { algorithm: 'RS256' })
    return token
  }
}