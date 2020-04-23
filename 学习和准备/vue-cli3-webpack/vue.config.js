/*
 * @Author: 黄遥
 * @Date: 2020-04-08 15:25:51
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-04-09 15:23:00
 * @Description: file content
 */
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const port = 9527 // dev port
module.exports = {
  assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  lintOnSave: process.env.NODE_ENV === 'development', // 是否在每次保存时 lint 代码，设置为 true 或 warning 时，会将 lint 错误输出为编译警告
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true, // 告诉 dev-server 在服务器启动后打开浏览器
    overlay: { // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖
      warnings: false,
      errors: true
    },
  },
  configureWebpack: {
    name: 'vue-cli3-webpack',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    config.optimization.splitChunks({
      chunks: 'all',
      cacheGroups: {
        commons: {
          name: 'chunk-commons',
          test: resolve('src/components'), // can customize your rules
          minChunks: 2, //  minimum common number
          priority: 5,
          reuseExistingChunk: true
        }
      }
    })
    config.plugin('webpackBundleAnalyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
      .end()
    config.plugin('OptimizeCssAssetsPlugin') // 压缩和优化 css 代码，
      .use('optimize-css-assets-webpack-plugin')
      .end()
    config.plugin('extract-css')
      .use('mini-css-extract-plugin', [{ // 提取出 css
        filename: "/static/css/[name].[contenthash].css",
        chunkFilename: "/static/css/[id].[contenthash].css"
      }])
  }
}