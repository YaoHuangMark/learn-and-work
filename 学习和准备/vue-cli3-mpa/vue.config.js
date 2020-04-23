/*
 * @Author: 黄遥
 * @Date: 2020-04-12 11:03:49
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-04-12 12:25:04
 * @Description: file content
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  productionSourceMap: false,
  pages: {
    index: {
      entry: './src/index/main.js',
      template: './public/index.html',
      // build时输出的文件名
      // filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '网站首页',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    detail: {
      entry: './src/detail/main.js',
      template: './public/detail.html',
      // filename: 'detail.html',
      title: '详情',
      chunks: ['chunk-vendors', 'chunk-common', 'detail']
    }
  }
}