/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-15 00:17:09
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-15 10:51:00
 * @FilePath: \myBlog_server\plugins\POPULATE_MAP.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  "Article": [{ "field": "author", "select": "nikname avatar" }, { "field": "column", "select": "name" }, { "field": "comments", "select": "content date uid" }],
  "Comment": [{ "field": "uid", "select": "nikname avatar" }],
}