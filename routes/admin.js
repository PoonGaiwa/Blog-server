/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-15 22:26:17
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-11-08 11:46:41
 * @FilePath: \myBlog_server\routes\admin.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const router = express.Router();
const assert = require('http-assert')
const createError = require('http-errors');
const User = require('../models/User')
const userControl = require('../core/userControl')
const { encrypt, decrypt } = require('../core/util/util')
const { sendToken } = require('../core/sendToken')
const QMAP = require('../plugins/QUE_MAP')

const CLASSIFY = {
  'login': '登录成功',
  'register': '注册成功'
}

/* GET users listing. */
router.post('/:classify', async function (req, res, next) {
  let { username, password, email, avatar, nickname } = req.body
  let { classify } = req.params
  let isClassPass = classify in CLASSIFY
  assert(isClassPass, 400, '无效请求')
  try {
    if (!username || username?.trim()?.length === 0 || !password || password?.trim()?.length === 0) {
      assert(false, 422, "账号密码必填")
    }
    let user
    if (classify === 'login') {
      user = await User.findOne({ username }).select('+password')
      assert(user, 422, "用户不存在")
      // 校验密码
      assert.equal(decrypt(password), decrypt(decrypt(user.password.trim())), 422, '账号密码错误')
    }
    if (classify === 'register') {
      // 前端传来的数据已经经过一次加密
      user = await User.create({ username: username, password: decrypt(password), email, nickname, avatar })
    }
    // 生成token
    let token = await sendToken(user)
    res.send(200, {
      statusCode: 200,
      message: CLASSIFY[classify],
      data: {
        userId: user._id,
        token: token
      }
    })
    next()
  } catch (err) {
    next(err);
  }
});

module.exports = router;

