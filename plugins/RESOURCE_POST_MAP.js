/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-15 13:41:34
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-19 16:55:38
 * @FilePath: \myBlog_server\plugins\POP_CT_MAP.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const Column = require('../models/Column')
const Comment = require('../models/Comment')
const Article = require('../models/Article')

module.exports = {
  "Article": {
    "body": function (body, _id) {
      return {
        ...body,
        author: _id
      }
    }
  },
  "Column": {
    "body": function (body, _id) {
      return {
        ...body,
        uid: _id
      }
    }
  }
}