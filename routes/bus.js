/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-12 23:54:02
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-13 00:02:39
 * @FilePath: \myBlog_server\routes\bus.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express')
const router = express.Router()

// /api/rest/:resource?query
// /api/rest/users?query
// /api/rest/articles?query

// 创建资源
router.post('/', async (req, res) => {
  const model = await req.Model.create(req.body)
  res.send(model)
})

// 更新资源
// /api/rest/:resource/:id?queryString
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
  const queryOptions = {}
  const items = await req.Model.find()
  res.send(items)
})

// 查询资源详情
router.get('/:id', async (req, res) => {
  const items = await req.Model.find(req.params.id)
  res.send(items)
})

module.exports = {
  busRoute: router
}