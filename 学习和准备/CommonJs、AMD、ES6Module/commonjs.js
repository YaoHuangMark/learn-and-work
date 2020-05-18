/*
 * @Author: 黄遥
 * @Date: 2020-04-02 09:53:59
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-05-06 10:42:53
 * @Description: file content
 */
const a = 'commonjs huangyao'
const b = 'commonjs b'

module.exports = { a , b}

var module = require('./a.js')

/**
 * ES Module 是原生实现的模块化方案，与 CommonJS 有以下几个区别
 * 1. CommonJS 支持动态导入，也就是 require(${path}/xx.js) ，后者目前不支持，但是已有提案
 * 2. CommonJS 是同步导入，因为用于服务器，文件都在本地，同步导入即使卡住主线程影响也不大。
 * 而后者是异步导入，因为用于浏览器，需要下载文件，如果也采用同步导入会对渲染有很大影响
 * 3. CommonJS 在导出时都是值拷贝，就算导出的值变了，导入的值也不会改变，所以如果想更新值，
 * 必须重新导入一次。但是 ES Module 采用实时绑定的方式，导入导出的值都指向同一个内存地址，所以导入值会跟随导出值变化
 * 4. ES Module 会编译成 require/exports 来执行
 */
// 引入模块 API
import XXX from './a.js'
import { XXX } from './a.js'
// 导出模块 API
export function a() {}
export default function() {}