/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-15 15:21:52
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-20 19:12:19
 * @FilePath: \myBlog_server\routes\search.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const assert = require('http-assert');
const { pagination } = require('../core/util/util');
const POPULATE_MAP = require('../plugins/POPULATE_MAP')
const qs = require('qs')
// 搜索文章 API
router.get('/', async (req, res, next) => {
  let modelName = 'Article'
  let { options = {}, page = 1, size = 100, query = {}, dis = 8, populate = {} } = req
  query = qs.parse(query.query)
  console.log(query);
  let regExp = new RegExp(query.q, 'i')
  query = {
    '$or': [
      { title: { $regex: regExp } },
      { content: { $regex: regExp } },
    ]
  }
  try {
    if (modelName in POPULATE_MAP) {
      populate = POPULATE_MAP[modelName]
    }
    let result = await pagination({ model: Article, query, options, populate, size, page, dis })
    res.send(200, {
      statusCode: 200,
      message: '查询成功',
      data: result
    })
  } catch (err) {
    next(err);
  }
});

module.exports = router;