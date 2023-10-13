/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-12 23:54:02
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-13 22:58:06
 * @FilePath: \myBlog_server\routes\bus.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express')
const router = express.Router()
const createError = require('http-errors');
const pagination = require('../core/util/util')

// 创建资源
router.post('/', async (req, res) => {
  console.log(req);
  try {
    const model = await req.Model.create(req.body)
    res.send(model)
  } catch (error) {
    next(createError(400))
  }
})

// 更新资源
// /api/rest/articles/fhdsjafjks/query?...
router.put('/:id', async (req, res) => {
  const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
  res.send(model)
})

// 删除资源
router.delete('/:id', async (req, res) => {
  await req.Model.findByIdAndDelete(req.params.id)
  res.send({
    errMsg: 'Ok'
  })
})

// 查询资源列表
router.get('/', async (req, res) => {
  const { options = {}, page = 1, size = 100, query = {}, dis = 8 } = req.body
  try {
    let result = await pagination({ model: req.Model, query, options, size, page, dis })
    res.send(result)
  } catch (error) {
    next(createError(422, '请求错误'))
  }
})

// 查询资源详情
router.get('/:id', async (req, res) => {
  const items = await req.Model.find(req.params.id)
  res.send(items)
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