/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-09 15:07:42
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-13 21:25:31
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

// const indexRouter = require('./routes/index');
const app = express();
app.use(cors({
  "origin": true,     // true为req.origin
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,     // next() 是否传递options请求
  "optionsSuccessStatus": 204,
  "credentials": true,          // 开启cookie跨域
  "maxAge": 172800,
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 中间件 nameMiddleware
const resourceMiddleware = require('./middleware/resource')
// 路由 nameRoute
const busRoute = require('./routes/bus')
const loginRoute = require('./routes/login')
const registerRoute = require('./routes/register')
const pubKeyRoute = require('./routes/getPubKey')

// 路由入口
app.use('/api/rest/:resource', resourceMiddleware(), busRoute)

// 登录 注册
app.use('/admin/login', loginRoute);
app.use('/admin/register', registerRoute);

// 获取公钥
app.use('/key', pubKeyRoute);




// app.use('/user', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
