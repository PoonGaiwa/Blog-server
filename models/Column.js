/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-12 23:42:09
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-15 15:08:04
 * @FilePath: \myBlog_server\models\Column.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-12 23:02:04
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-12 23:10:37
 * @FilePath: \express\mongoose\test\Comment.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const mongoose = require('mongoose')
const schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // 更新日期
  data: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now
  },
  // 文章 id
  aid: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Article'
  }]
})

module.exports = mongoose.model('Column', schema)