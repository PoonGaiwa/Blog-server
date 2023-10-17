/*
 * @Author: Gaiwa 13012265332@163.com
 * @Date: 2023-10-13 22:08:27
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-17 23:24:40
 * @FilePath: \myBlog_server\routes\upload.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express')
const path = require('path')
const router = express.Router()
const assert = require('http-assert')
const multer = require('multer')
const { uploadPath, uploadURL } = require('../config')
const { model } = require('mongoose')
const fs = require('fs')
const { maxFileSize } = require('../config')

const FILE_TYPE = {
  'user': 'user',
  'article': 'article'
}

const storage = multer.diskStorage({
  destination(req, res, cb) {
    let fileType = FILE_TYPE[req.params['classify'].trim()]
    const filePath = path.join(uploadPath, fileType)
    fs.existsSync(filePath) || fs.mkdirSync(filePath)
    cb(null, filePath);
  },
  filename(req, file, cb) {
    const { ext, base, name } = path.parse(file.originalname)
    cb(null, name + '_' + Date.now() + ext)
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: maxFileSize
  }
})

router.post('/:classify', upload.single('file'), (req, res, next) => {
  try {
    // 过滤fileType 
    let fileType = FILE_TYPE[req.params['classify']] ?? ''
    assert(fileType, 422, '文件上传分类不正确')
    let { uid } = req.body
    if (fileType === 'user') {
      assert(uid, 422, '用户头像必须指定UID')
    }
    let { destination, filename } = req.file
    let fileUrl = path.join(uploadURL, path.parse(destination).name, filename).replace(/\\/g, '/').replace('http:/', 'http://')
    let resultDate = {
      message: '上传成功',
      errorno: 0,
      data: {
        filename,
        fileUrl
      }
    }
    if (fileType === 'article') {
      let data = [fileUrl]
      resultDate = {
        "errno": 0,
        data
      }
    }
    res.send(200, resultDate)
  } catch (err) {
    next(err)
  }
})

module.exports = router