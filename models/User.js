/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-12 21:03:35
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-16 20:00:28
 * @FilePath: \express\mongoose\test\db.user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const mongoose = require('mongoose')
const { encrypt, decrypt } = require('../core/util/util')
const assert = require('http-assert')

const schema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, '密码必填'],
    validate: {
      validator: function (val) {
        return /[a-zA-Z][a-zA-Z0-9_]{5,16}/.test(val)
      },
      message: '请输入正确用户名'
    },
  },
  password: {
    type: String,
    select: false,
    required: [true, '密码必填'],
    validate: {
      validator: function (val) {
        return val !== '密码格式不正确'
      },
      message: '请输入正确的密码格式 必须包含大小写字母、数字和特殊字符的组合,长度在8-12之间'
    },
    set(val) {
      //触发器
      let isValidate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@$%^&*-_])[a-zA-Z0-9_#?!@$%^&*-]{8,16}$/.test(decrypt(val))
      if (isValidate) {
        return encrypt(encrypt(val))
      }
      return '密码格式不正确'
    },
  },
  email: {
    type: String,
    unique: true,
    required: [true, '邮箱必填'],
    validate: {
      validator: function (val) {
        return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(val)
      },
      message: '请输入合法邮箱地址'
    },
  },
  avatar: {
    type: String,
    default: './logo.jpg'
  },
  nickname: {
    type: String,
    validate: {
      validator: function (val) {
        return /^([\da-zA-Z\u0391-\uFFE5]{1,8})$/.test(val)
      },
      message: '昵称可包含 数字/英文/汉字 1-8位'
    },
    default: '无名氏'
  }
})

module.exports = mongoose.model('User', schema)