/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-15 16:32:35
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-16 12:03:05
 * @FilePath: \myBlog_server\routes\artLikes.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express')
const router = express.Router()
const Article = require('../models/Article')

// 文章点赞 post
router.post('/:id', async function (req, res, next) {
  let id = req.params.id
  try {
    let result = await Article.findByIdAndUpdate(id, {
      $inc: {
        like_num: 1
      }
    })
    let likes = ++result.like_num
    res.send(200, {
      message: '点赞成功',
      data: {
        likes: likes
      }
    })
  } catch (err) {
    next(err)
  }

})

module.exports = router
