/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-12 23:42:45
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-13 16:43:22
 * @FilePath: \myBlog_server\plugins\db.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/db_blog', {
  useUnifiedTopology: true,
})
let db = mongoose.connection
db.on('error', function (err) {
  console.log(err);
})
db.on('open', function (err) {
  console.dir('mongodb://127.0.0.1:27017/db_blog is open');
})
module.exports = {
  mongoose
}