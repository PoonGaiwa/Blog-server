/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-12 21:03:35
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-12 22:25:16
 * @FilePath: \express\mongoose\test\db.user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const mongoose = require('mongoose')
const { encrypt } = require('./util')
const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (val) {
        return /[a-zA-Z][a-zA-Z0-9_]+/.test(val)
      },
      message: '请输入正确用户名'
    },
  },
  password: {
    type: String,
    select: false,
    required: true,
    set(val) {
      //触发器
      return encrypt(val)
    },
  },
  email: {
    type: String,
    unique: true,
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
  nikname: {
    type: String,
    validate: {
      validator: function (val) {
        return /^([\da-zA-Z\u0391-\uFFE5]{1,8})$/.test(val)
      },
      message: '请输入昵称'
    },
  }
})

// User.create({
//   username: '',
//   password: firstPwd,
//   email: "130122653223@163.com",
//   nikname: 'zhangsan'
// }).then(data => {
//   console.log(data);
// }).catch(err => {
//   // 针对unique的报错提示
//   if (err.message.indexOf('duplicate key error') !== -1) {
//     console.log('索引项重复', err.keyPattern);
//     return
//   }
//   // 其他报错提示
//   Object.entries(err.errors).map(([key, val]) => {
//     console.log(`error:${key},${val.message}`);
//   })
// })