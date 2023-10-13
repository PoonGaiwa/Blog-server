const mongoose = require('mongoose')
const schema = mongoose.Schema({
  // 标题
  title: {
    type: String,
    required: true,
    default: "默认标题" + Date.now
  },
  // 封面图
  cover: {
    type: String,
  },
  // 文章内容
  body: {
    type: String,        // URIencode(HTMLCode)
    required: true
  },
  create_at: {
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
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Column',
    default: '技术文章'
  }
})

module.exports = mongoose.model('Article', schema)