/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-12 23:42:09
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-15 15:54:53
 * @FilePath: \myBlog_server\models\Article.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const mongoose = require('mongoose')
const uploadURL = require('../config')
const schema = mongoose.Schema({
  // 标题
  title: {
    type: String,
    required: true,
    default: "默认标题" + Date.now
  },
  // 封面图
  cover: {
    type: String,      // URL
    default: `${uploadURL}article/article_cover.png`
  },
  // 文章内容
  content: {
    type: String,        // URIencode(HTMLCode)
    required: true,
    set(val) {
      try {
        return decodeURIComponent(val).replace(/\"/g, "\'")
      } catch (err) {
        return val
      }
    }
  },
  date: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now
  },
  hits_num: {
    type: Number,
    default: 0
  },
  comment_num: {
    type: Number,
    default: 0
  },
  like_num: {
    type: Number,
    default: 0
  },
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  // 评论集合
  comments: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Comment'
    }
  ],
  // 分类
  column: {
    type: String,
    ref: 'Column',
    default: '652b4e7077610226fd0151db'
  }
})

module.exports = mongoose.model('Article', schema)