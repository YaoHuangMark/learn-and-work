/*
 * @Author: 黄遥
 * @Date: 2020-04-05 15:48:33
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-04-05 16:48:54
 * @Description: file content
 */
const webpack = require('webpack')
const merge = require('webpack-merge');
const common = require('./webpack.base.conf');
const dev = require('./config/dev.env');

module.exports = merge(common,{
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': Object.assign({}, dev)
    })
  ]
})