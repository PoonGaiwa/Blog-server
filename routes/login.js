/*
 * @Author: gaiwa gaiwa@163.com
 * @Date: 2023-09-27 21:39:04
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-15 11:36:44
 * @FilePath: \express\myBlog\routes\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const router = express.Router();
const { sendToken } = require('../core/sendToken')
const assert = require('http-assert')
const { decrypt } = require('../core/util/util')
const User = require('../models/User')

/* GET users listing. */
router.post('/', async function (req, res, next) {
  let { username, password } = req.body
  try {
    if (!username || username?.trim()?.length === 0 || !password || password?.trim()?.length === 0) {
      assert(false, 422, "账号密码必填")
    }
    const user = await User.findOne({ username }).select('+password')
    assert(user, 422, "用户不存在")
    // 校验密码
    assert.equal(password, decrypt(decrypt(user.password)), '账号密码错误')
    // 生成token
    let token = await sendToken(user)
    res.send(200, {
      data: {
        message: '登录成功',
        data: {
          userId: user._id,
          token: token
        }
      }
    })
  } catch (err) {
    next(err);
  }
});

module.exports = router;