/*
 * @Author: gaiwa gaiwa@163.com
 * @Date: 2023-09-27 15:28:24
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-13 22:56:36
 * @FilePath: \express\myBlog\routes\register.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const router = express.Router();
const userControl = require('../core/userControl')
const { getUserStatusMsg } = require('../core/statusControl');
const { sendToken } = require('../core/sendToken');
const assert = require('http-assert')
const User = require('../models/User')
const { encrypt, decrypt } = require('../core/util/util')
const createError = require('http-errors');
const QMAP = require('../plugins/QUE_MAP')

/* GET users listing. */
router.post('/', async function (req, res, next) {
  let { username, password, email, avatar, nikname } = req.body
  try {
    if (!username || username?.trim()?.length === 0 || !password || password?.trim()?.length === 0) {
      assert(false, 422, "账号密码必填")
    }
    const user = await User.create({ username: username, password: encrypt(encrypt(password.trim())), email, nikname, avatar })
    // 生成token
    let token = await sendToken(user)
    res.send(200, {
      data: {
        message: '注册成功',
        data: {
          userId: user._id,
          token: token
        }
      }
    })
    next()
  } catch (err) {
    let repeatKey
    if (err.message.indexOf('duplicate key error') !== -1) {
      repeatKey = Object.entries(err.keyPattern).map(([key, value]) => {
        return `${QMAP[key]}已经存在`
      })[0]
      res.send(createError(422, repeatKey))
    } else {
      // 其他报错提示
      repeatKey = Object.entries(err.errors).map(([key, val]) => {
        return `${val.message}`;
      }).reduce((a, c) => {
        a += c
        return a
      }, "")
    }
    res.send(createError(422, repeatKey))
    next()
  }
});

module.exports = router;
