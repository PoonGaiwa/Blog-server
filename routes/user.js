/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-12 23:54:02
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-21 20:02:10
 * @FilePath: \myBlog_server\routes\bus.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express')
const router = express.Router()
const createError = require('http-errors');
const { pagination } = require('../core/util/util')
const User = require('../models/User')
const Column = require('../models/Column')
const POPULATE_MAP = require('../plugins/POPULATE_MAP')
const POP_POST_MAP = require('../plugins/POP_POST_MAP');
const POP_GET_MAP = require('../plugins/POP_GET_MAP');
const RESOURCE_POST_MAP = require('../plugins/RESOURCE_POST_MAP')
const POP_PUT_MAP = require('../plugins/POP_PUT_MAP');
const assert = require('http-assert');
const { model } = require('mongoose');
const mongoPage = require('mongoose-sex-page')
const qs = require('qs');
const Article = require('../models/Article');

// 更新资源
// /api/rest/articles/fhdsjafjks/query?...
router.put('/', async (req, res, next) => {
  let putData = req.body
  let isPass = req.isPass  // 鉴权结果
  let id = req._id  // userID
  try {
    assert(isPass, 400, '无权修改')
    await User.findByIdAndUpdate(id, putData, {
      runValidators: true, new: true
    })
    res.send(200, {
      statusCode: 200,
      message: '修改成功'
    })
  } catch (err) {
    next(err)
  }
})

// 查询资源详情
router.get('/', async (req, res, next) => {
  let _id = req._id
  try {
    let userResult = await User.findById(_id)
    let articleCount = await Article.find({ author: _id }).count()
    let columnCount = await Column.find({ author: _id }).count()
    userResult = userResult.toJSON()
    userResult.articleCount = articleCount
    userResult.columnCount = columnCount
    res.send(200, {
      statusCode: 200,
      message: '查询成功',
      data: userResult
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router