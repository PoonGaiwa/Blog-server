/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-12 23:38:26
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-12 23:41:29
 * @FilePath: \myBlog_server\middleware\resource.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { classify } = require('inflection')

module.exports = options => {
  return async (req, res, next) => {
    const modelName = inflection.classify(req.params.resource)
    req.Model = require(`../models/${modelName}`)
    next()
  }
}