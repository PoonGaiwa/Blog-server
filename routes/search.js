/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-15 15:21:52
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-16 11:39:46
 * @FilePath: \myBlog_server\routes\search.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const assert = require('http-assert');
const { pagination } = require('../core/util/util');

// 搜索文章 API
router.get('/', async (req, res, next) => {
  let { q = '' } = req.query
  let regExp = new RegExp(q, 'i')
  let options = "title ", page = 1, size = 100,
    query = {
      $or: [
        { title: { $regex: regExp } },
        { content: { $regex: regExp } }
      ]
    }, dis = 8;
  try {
    let result = await pagination({ model: Article, query, options, size, page, dis })
    res.send(200, {
      message: '查询成功',
      data: result
    })
  } catch (err) {
    next(err)
  }
});

module.exports = router;