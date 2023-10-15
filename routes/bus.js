/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-12 23:54:02
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-15 14:56:54
 * @FilePath: \myBlog_server\routes\bus.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express')
const router = express.Router()
const createError = require('http-errors');
const { pagination } = require('../core/util/util')
const Article = require('../models/Article')
const Column = require('../models/Column')
const Comment = require('../models/Comment')
const POPULATE_MAP = require('../plugins/POPULATE_MAP')
const POP_CT_MAP = require('../plugins/POP_CT_MAP');
const assert = require('http-assert');
// 创建资源 提交文章，评论
router.post('/', async (req, res, next) => {
  console.log(req);
  try {
    const model = await req.Model.create(req.body)
    let modelName = req.Model.modelName
    console.log(req.body);
    if (modelName in POP_CT_MAP) {
      let item = POP_CT_MAP[modelName]
      let { _refId, _model, queryAct, options } = item
      let _id = model._id
      let refId = req.body?.[_refId]
      console.log(refId);
      assert(refId, 422, `${_refId}必填`)
      await _model[queryAct](refId, options(_id))
    }
    res.send(model)
  } catch (err) {
    next(err || createError(400), "请求错误")
  }
})
// 更新资源
// /api/rest/articles/fhdsjafjks/query?...
router.put('/:id', async (req, res, next) => {
  const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
  res.send(model)
})

// 删除资源
router.delete('/:id', async (req, res, next) => {
  await req.Model.findByIdAndDelete(req.params.id)
  res.send({
    errMsg: 'Ok'
  })
})

// 查询资源列表
router.get('/', async (req, res, next) => {
  const { options = {}, page = 1, size = 100, query = {}, dis = 8 } = req.body
  try {
    let result = await pagination({ model: req.Model, query, options, size, page, dis })
    res.send(result)
  } catch (error) {
    console.log(error);
    // next(createError(422, '请求错误'))
  }
})

// 查询资源详情
router.get('/:id', async (req, res, next) => {
  let modelName = req.Model.modelName
  try {
    let querys = await req.Model.findById(req.params.id)
    if (modelName in POPULATE_MAP) {
      let populates = POPULATE_MAP[modelName]
      querys = await querys.populate(populates)
      res.send(querys)
    }
  } catch (err) {
    console.log(err);
  }
})

module.exports = router



/**
 * 响应
 *  reponse
 * 成功
 *  GET: 200 ok
 *  POST: 201 Created
 *  PUT: 200 ok
 *  PATCH: 200 ok
 *  DELETE 204 No content
 *  {
 *    message: 'ok',
 *    data: {
 *      count: 返回条目数量
 *      list: [   // 请求列表
 *        {},{},{}
 *      ]   
 *    }
 *  }
 *  操作反馈 更新 添加
 *  {
 *    message: '用户注册成功|数据更新成功|文章提交成功'
 *  }
 *  错误
 *    statusCode
 *      400 请求参数错误 请求路径错误
*       401 jwt验证未通过 账号面错误
        403 无权访问 权限不够
        404 访问资源不存在
        422 用户不存在 密码错误 token过期

    {
      message: 响应错误
    }
 */