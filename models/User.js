/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-12 21:03:35
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-15 23:25:29
 * @FilePath: \express\mongoose\test\db.user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const mongoose = require('mongoose')
const { encrypt } = require('../core/util/util')
const assert = require('http-assert')
// mongoose.connect('mongodb://127.0.0.1:27017/db_blog', {
//   useUnifiedTopology: true,
// })
// let db = mongoose.connection
// db.on('error', function (err) {
//   console.log(err);
// })
// db.on('open', function (err) {
//   console.dir('mongodb://127.0.0.1:27017/db_blog is open');
// })
// module.exports = {
//   mongoose
// }

const schema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, '密码必填'],
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
    required: [true, '密码必填'],
    validate: {
      validator: function (val) {
        return val !== '密码格式不正确'
      },
      message: '请输入正确的密码格式 必须包含大小写字母、数字和特殊字符的组合,长度在8-12之间'
    },
    set(val) {
      //触发器
      let isValidate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@$%^&*-_])[a-zA-Z0-9_#?!@$%^&*-]{8,12}$/.test(val)
      if (isValidate) {
        return encrypt(val)
      }
      return '密码格式不正确'
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
    default: '无名氏'
  }
})

module.exports = mongoose.model('User', schema)
// let User = mongoose.model('User', schema)


// User.create({
//   username: 'panpan',
//   password: 'MG7RaO0n8L8xdJHplzfnuiItSb6wk+uQyFOFLn2N0crdG4j9AIC8IjC4za51dD5+3gvbagpzgXEo+kvLjwrLLSNmHCPpSYljNxnxFUrgt45I+6bk+nuRV0UCNE1Db/VPsV8/rMx4LDz+ySBgC7rIe4RNOy1I46fxVEHg/9SPQm0=',
//   email: "4654654654@163.com",
//   nikname: 'zhangsan'
// }).then(data => {
//   console.log(data);
// }).catch(err => {
//   // 针对unique的报错提示
//   if (err.message.indexOf('duplicate key error') !== -1) {
//     console.log('索引项重复', err.keyPattern);
//   } else {
//     // 其他报错提示
//     Object.entries(err.errors).map(([key, val]) => {
//       console.log(`error:${key},${val.message}`);
//     })
//   }
// })