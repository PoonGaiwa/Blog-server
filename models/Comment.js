/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-12 23:02:04
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-20 00:53:26
 * @FilePath: \express\mongoose\test\Comment.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const mongoose = require('mongoose')
const { formatDate } = require('../core/util/util')

const schema = mongoose.Schema({
  content: {
    type: String,
    required: [true, '内容不能为空']
  },
  // 更新日期
  date: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now,
    get(val) {
      return formatDate(new Date(val), 'MM-dd')
    }
  },
  // 评论者 id
  uid: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  // 文章 id
  aid: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Article'
  }
})
schema.set('toJSON', { getters: true, virtuals: false });

module.exports = mongoose.model('Comment', schema)