const path = require('path')
module.exports = {
  host: '127.0.0.1',
  root: process.cwd(),
  port: 3000,
  pubKeyPath: path.join(process.cwd(), '/auth/public.cer'),
  priKeyPath: path.join(process.cwd(), '/auth/private.cer'),
  userPath: path.join(process.cwd(), '/user/user.json')
}