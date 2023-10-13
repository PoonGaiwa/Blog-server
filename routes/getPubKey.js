/*
 * @Author: gaiwa gaiwa@163.com
 * @Date: 2023-09-27 16:00:07
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-13 21:23:34
 * @FilePath: \express\myBlog\routes\getPubKey.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const { getPublicKey } = require('../core/rsaControl')
const router = express.Router();
const Key = require('../models/Key')
const assert = require('http-assert')

/* GET keys */
router.get('/', async function (req, res, next) {
  let result = await Key.findOne()
  res.send(200, {
    data: {
      message: 'ok',
      data: {
        pubKey: result.content
      }
    }
  })
});

module.exports = router;
