/*
 * @Author: 黄遥
 * @Date: 2020-04-07 23:15:32
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-04-08 11:11:12
 * @Description: file content
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].[chunkhash].js', // 非入口 chunk 的名称
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        // 匹配 css 文件
        test: /\.css$/,
        /*
        先使用 css-loader 处理，返回的结果交给 style-loader 处理。
        css-loader 将 css 内容存为 js 字符串，并且把 background，@font-face 等引用的图片，
        字体文件交给指定的 loader 打包，类似上面的 html-loader，用什么 loader 同样在 loaders 对象中定义，等会下面就会看到
        */
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}