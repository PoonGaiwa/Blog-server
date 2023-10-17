/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-09 15:07:42
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-17 17:35:17
 * @FilePath: \myBlog_server\myblog_server\app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('./plugins/db');
const maxFileSize = require('./config');
const expressJwt = require('express-jwt');
const { getPublicKeySync } = require('./core/rsaControl')
const QMAP = require('./plugins/QUE_MAP')
const assert = require('http-assert')

// const indexRouter = require('./routes/index');
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//开放静态地址
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(cors({
  "origin": true,     // true为req.origin
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,     // next() 是否传递options请求
  "optionsSuccessStatus": 204,
  "credentials": true,          // 开启cookie跨域
  "maxAge": 172800,
}))
// 中间件 nameMiddleware
const resourceMiddleware = require('./middleware/resource')
// 路由 nameRoute
const busRoute = require('./routes/bus')
const adminRoute = require('./routes/admin')
const pubKeyRoute = require('./routes/getPubKey')
const uploadRoute = require('./routes/upload')
const searchRoute = require('./routes/search')
const artLikesRoute = require('./routes/artLikes');
const User = require('./models/User');
const { send } = require('process');

app.use(expressJwt({
  secret: getPublicKeySync(),
  algorithms: ["RS256"],  //6.0.0 以上版本必须设置
  isRevoked: async (req, payload, next) => {
    // token解析完成后 回调token内容 即payload
    let { user_id } = payload    // iax是unix时间戳，单位是秒
    req._id = user_id
    req.isPass = true
    console.log(req.isPass);
    try {
      let result = await User.findById(req._id)
      if (!result) {
        req.isPass = false
      }
      next()
    } catch (err) {
      next(err)
    }
  }
}).unless({
  path: [
    { url: /^\/api\/rest\/.*/, methods: ['GET', 'POST'] },
    { url: '/api/rest/comments', methods: ['GET', 'POST'] },
    { url: '/api/rest/columns', methods: ['GET'] },
    { url: '/api/rest/articles', methods: ['GET'] },
    { url: /^\/api\/rest\/articles\/.*/, methods: ['GET'] },
    { url: '/api/rest/keys', methods: ['POST'] },
    { url: '/key', methods: ['GET'] },
    { url: '/admin/login' },
    { url: '/admin/register' },
    { url: '/articles/search' },
    { url: /^\/articles\/likes\/.*/, methods: ['POST'] }
  ]
}))


// 路由入口
app.use('/api/rest/:resource', resourceMiddleware(), busRoute)

// 登录 注册
app.use('/admin', adminRoute);

app.use('/index', (req, res, next) => {
  console.log(req.isPass);
  try {
    assert(req.isPass, 401, '请先登录')
    res.send(200, {
      message: 'ok'
    })
  } catch (err) {
    next(err)
  }
})

// 获取公钥
app.use('/key', pubKeyRoute);

// 上传文件
app.use('/upload', uploadRoute)

// 文章搜索
app.use('/articles/search', searchRoute)

// 文章点赞
app.use('/articles/likes', artLikesRoute)

const ERROR_CODE_MAP = {
  'LIMIT_FILE_SIZE': `文件大小不得超过${maxFileSize}字节`,
}
const ERROR_STATUS_MAP = {
  '401': "无权限操作，请先登录"
}

// app.use('/user', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development

  if (err.message.indexOf('duplicate key error') !== -1) {
    let repeatKey = Object.entries(err.keyPattern).map(([key, value]) => {
      return `${QMAP[key]}已经注册`
    })[0]
    err.status = 422
    err.message = repeatKey
  }
  if (err.errors) {
    // 其他报错提示
    let paramErrors = Object.entries(err.errors).map(([key, val]) => {
      return `${val.message}`;
    }).join(',')
    err.status = 422
    err.message = paramErrors
  }

  if (err.code in ERROR_CODE_MAP) {
    err.status = 422
    err.message = ERROR_CODE_MAP[err.code]
  }
  if (err.status in ERROR_STATUS_MAP) {
    err.message = ERROR_STATUS_MAP[err.status]
  }

  console.log(err);

  res.status(err.status || 500).send({
    code: err.status,
    message: err.message
  })

  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
