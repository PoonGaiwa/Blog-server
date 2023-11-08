/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-12 23:42:09
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-11-08 11:43:24
 * @FilePath: \myBlog_server\models\Article.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const mongoose = require('mongoose')
const { uploadURL } = require('../config')
const { formatDate } = require('../core/util/util')
const mongooseSexPage = require('mongoose-sex-page')
const schema = mongoose.Schema({
  // 标题
  title: {
    type: String,
    required: [true, '标题不能为空'],
    default: "默认标题"
  },
  // 封面图
  cover: {
    type: String,      // URL
    default: `${uploadURL}article/article_cover.png`
  },
  // 文章内容
  content: {
    type: String,        // URIencode(HTMLCode)
    required: [true, '内容不能为空'],
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
    default: Date.now,
    get(val) {
      return formatDate(new Date(val), 'MM-dd')
    }
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
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Column',
    default: '652fad7609e81f183b254ca4'
  },
  like_users: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    }
  ]
})
schema.set('toJSON', { getters: true, virtuals: false });
module.exports = mongoose.model('Article', schema)