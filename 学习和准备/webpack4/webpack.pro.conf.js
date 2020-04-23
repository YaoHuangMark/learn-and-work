/*
 * @Author: 黄遥
 * @Date: 2020-04-05 15:48:51
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-04-06 08:58:07
 * @Description: file content
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); // 替代 UglifyJSPlugin
/*
  问题原因:
  1，是UglifyJS不支持ES6的语法。
  2，发现uglifyjs-webpack-plugin 2.0版本的Release日志中，明确提示重新切换回到uglify-js，因为uglify-es被废弃了，如果需要ES6代码压缩，请使用terser-webpack-plugin
*/
const common = require('./webpack.base.conf');
const prod = require('./config/prod.env');

module.exports = merge(common,{
  // devtool: 'source-map',
  mode: 'production',
  plugins: [
    // new UglifyJSPlugin({
    //   uglifyOptions: {
    //     compress: {
    //       warnings: false
    //     }
    //   },
    //   sourceMap: true,
    //   parallel: true
    // }),
    new webpack.DefinePlugin({
      'process.env': Object.assign({}, prod)
    })
  ],
  optimization: {
    splitChunks: { // 替代 webpack.optimize.CommonsChunkPlugin
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    },
    minimize: true, // 生产环境下默认为 true
    minimizer: [new TerserPlugin()] // 默认使用 TerserPlugin
  }
})