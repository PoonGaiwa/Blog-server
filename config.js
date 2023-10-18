/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-09 15:29:54
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-17 23:11:51
 * @FilePath: \myBlog_server\config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path')
module.exports = {
  host: '127.0.0.1',
  root: process.cwd(),
  port: 3000,
  keyPath: path.join(process.cwd(), '/auth'),
  pubKeyPath: path.join(process.cwd(), '/auth/public.cer'),
  priKeyPath: path.join(process.cwd(), '/auth/private.cer'),
  userPath: path.join(process.cwd(), '/user/user.json'),
  uploadPath: path.join(process.cwd(), '/uploads'),
  uploadURL: 'http://127.0.0.1:3000/',
  maxFileSize: 5 * 1024 * 1024
}