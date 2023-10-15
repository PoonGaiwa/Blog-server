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
  let { username, password, email, avatar, nikname } = req.body
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
      assert.equal(password, user.password, '账号密码错误')
    }
    if (classify === 'register') {
      // 模拟前端密码加密一次，存入数据库时触发set又加密一次
      user = await User.create({ username: username, password: password.trim(), email, nikname, avatar })

    }
    // 生成token
    let token = await sendToken(user)
    res.send(200, {
      message: CLASSIFY[classify],
      data: {
        userId: user._id,
        token: token
      }
    })
    next()
  } catch (err) {
    // if (classify === 'register') {
    //   let repeatKey
    //   if (err.message.indexOf('duplicate key error') !== -1) {
    //     repeatKey = Object.entries(err.keyPattern).map(([key, value]) => {
    //       return `${QMAP[key]}已经存在`
    //     })[0]
    //     res.send(createError(422, repeatKey))
    //   } else {
    //     console.log(err);
    //     // 其他报错提示
    //     repeatKey = Object.entries(err.errors).map(([key, val]) => {
    //       return `${val.message}`;
    //     }).reduce((a, c) => {
    //       a += c
    //       return a
    //     }, "")
    //   }
    //   res.send(createError(422, repeatKey))
    // }
    next(err);
  }
});

module.exports = router;

