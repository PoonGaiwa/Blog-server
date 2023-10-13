/*
 * @Author: gaiwa gaiwa@163.com
 * @Date: 2023-09-27 15:39:21
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-13 21:53:26
 * @FilePath: \express\myBlog\util\util.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path')
const fs = require('fs').promises
const fsSync = require('fs')
const NodeRSA = require('node-rsa')
const page = require('mongoose-sex-page')
const { priKeyPath, pubKeyPath } = require('../../config')

// generateKeys()
async function generateKeys() {
	const newkey = new NodeRSA({ b: 512 })
	newkey.setOptions({ encryptionScheme: 'pkcs1' })
	let public_key = newkey.exportKey('pkcs8-public')
	let private_key = newkey.exportKey('pkcs8-private')

	await fs.writeFile(priKeyPath, private_key)
	await fs.writeFile(pubKeyPath, public_key)
}

function encrypt(plain) {
	// 读取密钥 公钥
	let public_key = fsSync.readFileSync(pubKeyPath, 'utf8')
	const nodersa = new NodeRSA(public_key)
	// 设置密钥类型
	nodersa.setOptions({ encryptionScheme: 'pkcs1' })
	// 调用加密方法
	const encrypted = nodersa.encrypt(plain, 'base64')
	return encrypted
}

function decrypt(cipher) {
	let private_key = fsSync.readFileSync(priKeyPath, 'utf8')
	let prikey = new NodeRSA(private_key)
	prikey.setOptions({ encryptionScheme: 'pkcs1' })
	return prikey.decrypt(cipher, 'utf8')
}

async function pagination({ model, query, options, size, page, dis }) {
	let result = await page(model).find(query).select(options).size(size).page(page).display(dis).exec()
	let { total, records, pages, display } = result
	let count = result.records.length
	return { count, page, size, total, list: records, pages, display }
}

module.exports = {
	encrypt, decrypt, generateKeys, pagination
}