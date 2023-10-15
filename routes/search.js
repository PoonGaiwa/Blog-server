const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const assert = require('http-assert');

// 搜索文章 API
router.get('/', async (req, res, next) => {
  let { q = '' } = req.query
  let regExp = new RegExp(q, 'i')
  try {
    let result = await Article.find({
      $or: [
        { title: { $regex: regExp } },
        { content: { $regex: regExp } }
      ]
    })
    console.log(result);
    res.send(200, {
      message: '查询成功',
      data: result
    })
    // assert(result,)
  } catch (err) {
    next(err)
  }
});

module.exports = router;