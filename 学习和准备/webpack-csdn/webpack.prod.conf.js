/*
 * @Author: 黄遥
 * @Date: 2020-04-07 23:15:51
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-04-08 11:15:41
 * @Description: file content
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.base.conf');

module.exports = merge(common,{
  mode: 'production',
  optimization: {
    splitChunks: { // 替代 webpack.optimize.CommonsChunkPlugin
      cacheGroups: {
        vendors: {
          chunks: "all",
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          minChunks: 1,
          minSize: 30000,
          priority: 10 // 设置优先级
        }
      }
    }
  }
})