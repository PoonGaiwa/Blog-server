/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-12 23:54:02
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-19 13:44:08
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
const User = require('../models/User')
const POPULATE_MAP = require('../plugins/POPULATE_MAP')
const POP_POST_MAP = require('../plugins/POP_POST_MAP');
const POP_GET_MAP = require('../plugins/POP_GET_MAP');
const RESOURCE_POST_MAP = require('../plugins/RESOURCE_POST_MAP')
const POP_PUT_MAP = require('../plugins/POP_PUT_MAP');
const assert = require('http-assert');
const { model } = require('mongoose');
const mongoPage = require('mongoose-sex-page')
const qs = require('qs')


// 创建资源 提交文章，评论
router.post('/', async (req, res, next) => {
  try {
    let modelName = req.Model.modelName
    let body = req.body
    if (modelName in RESOURCE_POST_MAP) {
      body = RESOURCE_POST_MAP[modelName]['body'](body, req._id)
    }
    const result = await req.Model.create(body)
    if (modelName in POP_POST_MAP) {
      let item = POP_POST_MAP[modelName]
      let { _refId, options, _model } = item
      let _id = result._id
      let refId = result?.[_refId]
      assert(refId, 422, `${_refId}必填`)
      await _model.findByIdAndUpdate(refId, options(_id))
    }
    res.send(200, {
      message: '提交成功',
      data: { id: result._id }
    })
  } catch (err) {
    next(err || createError(422), "请求错误")
  }
})
// 更新资源
// /api/rest/articles/fhdsjafjks/query?...
router.put('/:id', async (req, res, next) => {
  let putData = req.body
  let modelName = req.Model.modelName
  let isPass = req.isPass
  let id = req.params.id
  try {
    let { revisable, authField } = POP_PUT_MAP[modelName]
    let isValidate = (modelName in POP_PUT_MAP) && isPass
    assert(isValidate, 422, '无权修改')
    let findData = await req.Model.findById(id)
    assert.equal(id, findData[authField], 422, '无权修改')
    let updateData = Object.fromEntries(Object.entries(putData).filter(([key, value]) => {
      return revisable.includes(key)
    }))
    isValidate = Object.keys(updateData).length !== 0
    assert(isValidate, 422, '修改失败')
    updateData['date'] = new Date().toISOString()
    await req.Model.findByIdAndUpdate(id, updateData)
    res.send(200, {
      message: '修改成功'
    })
  } catch (err) {
    next(err)
  }
})

// 删除资源
router.delete('/:id', async (req, res, next) => {
  await req.Model.findByIdAndDelete(req.params.id)
  res.send(200, {
    message: '删除成功'
  })
})

// 查询资源列表
router.get('/', async (req, res, next) => {
  let { options = {}, page = 1, size = 100, query = {}, dis = 8, populate = {} } = req
  let modelName = req.Model.modelName
  try {
    if (modelName in POPULATE_MAP) {
      populate = POPULATE_MAP[modelName]
    }
    let result = await pagination({ model: req.Model, query, options, populate, size, page, dis })
    res.send(200, {
      message: '查询成功',
      data: result
    })
  } catch (err) {
    next(err);
  }
})

// 查询资源详情
router.get('/:id', async (req, res, next) => {
  let modelName = req.Model.modelName
  let _id = req.params.id
  try {
    let querys = req.Model.findById(_id)
    if (modelName in POPULATE_MAP) {
      let populates = POPULATE_MAP[modelName]
      querys = querys.populate(populates)
      querys = await querys.exec()
      res.send(200, {
        message: '查询成功',
        data: querys
      })
    }
    // 如果根据ID查看某个文章 文章的hit_num会加1
    if (modelName === 'Article') {
      let { queryAct, options } = POP_GET_MAP[modelName]
      await req.Model[queryAct](_id, options())
    }
  } catch (err) {
    next(err);
  }
})

module.exports = router