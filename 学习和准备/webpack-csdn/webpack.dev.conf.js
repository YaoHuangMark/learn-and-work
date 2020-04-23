/*
 * @Author: 黄遥
 * @Date: 2020-04-07 23:15:43
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-04-07 23:16:54
 * @Description: file content
 */
const webpack = require('webpack')
const merge = require('webpack-merge'); // 合并配置
const common = require('./webpack.base.conf');

module.exports = merge(common,{
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  }
})