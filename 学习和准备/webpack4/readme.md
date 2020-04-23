<!--
 * @Author: 黄遥
 * @Date: 2020-04-05 11:00:05
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-04-05 21:40:48
 * @Description: file content
 -->
# style-loader css-loader 读取 css
# file-loader 加载样式背景图片
# file-loader和url-loader 可以接收并加载任何文件，然后将其输出到构建目录。例如：图片、字体
# HtmlWebpackPlugin 解决更新 index.html中引入的 entry js


# devtool:inline-source-map 用于追踪代码，方便调试

# webpack 中有几个不同的选项，可以帮助你在代码发生变化后自动编译代码：
## 1. webpack's Watch Mode  缺点是不会自动刷新浏览器
## 2. webpack-dev-server（web服务器）
## 3. webpack-dev-middleware

# HRM new webpack.NamedModulesPlugin()；new webpack.HotModuleReplacementPlugin()

# 生产环境构建
## webpack-merge
## UglifyJSPlugin (代码压缩)
## webpack.DefinePlugin (设置环境变量 env)

# 代码分离
## 入口起点【entry points】
## 防止重复【prevent duplication】，用到 CommonsChunkPlugin
## 动态导入【dynamic imports】，使用 ECMAScript 提案中的 import() 语法，imports() 调用会在内部用到 promises。如果在旧版浏览器中使用，记得使用一个 polyfill 库（例如 es-promise 或 promise-polyfill），来 shim Promise

# 缓存
## 输出文件的文件名【Output Filenames】用 chunkhash 代替 hash