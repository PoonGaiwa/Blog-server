/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-15 00:17:09
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-17 13:09:21
 * @FilePath: \myBlog_server\plugins\POPULATE_MAP.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  "Article": [{
    "path": "author",
    "select": "nickname avatar",
  },
  {
    "path": "column", "select": "name"
  },
  {
    "path": "comments",
    "select": "content date uid",
    "populate": {
      "path": "uid",
      "select": "nickname avatar"
    }
  }],
  "Comment": [{
    "path": "_id",
    "select": "nickname avatar"
  }],
  "Column": [{
    "path": "aid",
    "select": "title cover author hits_num like_num comment_num date",
    "populate": {
      "path": "author",
      "select": "nickname avatar"
    }
  }],
}