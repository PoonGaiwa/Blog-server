/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-15 16:32:35
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-11-08 13:21:04
 * @FilePath: \myBlog_server\routes\artLikes.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const Article = require('../models/Article')
const { getPublicKeySync, getPrivateKey } = require('../core/rsaControl')

// 文章点赞 post
router.post('/:id', async (req, res, next) => {
  let token = req.headers?.authorization?.replace('Bearer ', '')
  if (token) {
    let key = getPublicKeySync()
    jwt.verify(token, key, function (err, data) {
      if (err) {
        console.log(err);
        return
      }
      let userId = data.user_id
      if (userId) {
        req._id = userId
      }
    })
  }
  next()
}, async (req, res, next) => {
  let id = req.params.id
  let isLike = true
  let query = {}
  // true点赞 false取消点赞
  if (req._id) {
    let article = await Article.findById(id)
    let likeUsers = article?.['like_users']
    isLike = !(likeUsers.includes(id))
    query[isLike ? '$addToSet' : '$pull'] = {
      like_users: req._id
    }
  }
  query['$inc'] = {
    like_num: isLike ? 1 : -1
  }
  console.log(query);
  let result = await Article.findByIdAndUpdate(id, query)
  let likes = ++result.like_num
  res.send(200, {
    message: '点赞成功',
    data: {
      likes: likes
    }
  })
})

module.exports = router
