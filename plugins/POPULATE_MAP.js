/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-15 00:17:09
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-15 15:11:45
 * @FilePath: \myBlog_server\plugins\POPULATE_MAP.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  "Article": [{
    "path": "author",
    "select": "nikname avatar"
  },
  {
    "path": "column", "select": "name"
  },
  {
    "path": "comments",
    "select": "content date uid",
    "populate": {
      "path": "uid",
      "select": "nikname avatar"
    }
  }],
  "Comment": [{
    "path": "uid",
    "select": "nikname avatar"
  }],
  "Column": [{
    "path": "aid",
    "select": "title cover author hits_num like_num comment_num",
    "populate": {
      "path": "author",
      "select": "nikname avatar"
    }
  }],
}