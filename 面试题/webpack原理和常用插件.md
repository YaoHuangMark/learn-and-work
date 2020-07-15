<!--
 * @Author: 黄遥
 * @Date: 2020-06-02 10:29:55
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-06-02 11:30:34
 * @Description: file content
--> 
Webpack 模块打包工具，它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss、TypeScript等），并将其打包为合适的格式以供浏览器使用。
其实Webpack和另外两个并没有太多的可比性，Gulp/Grunt是一种能够优化前端的开发流程的工具，而WebPack是一种模块化的解决方案，不过Webpack的优点使得Webpack在很多场景下可以替代Gulp/Grunt类的工具。
1. 代码转换：TypeScript 编译成 JavaScript，SCSS、LESS、编译成 CSS
2. 文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片
3. 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载
4. 模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件
5. 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器

- Entry: 入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
- Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块
- Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割
- Loader：模块转换器，用于把模块原内容按照需求转换成新内容
- Plugin：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情
- Output：输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果

> Webpack 启动后会从 Entry 里配置的 Module 开始递归解析 Entry 依赖的所有 Module。每找到一个 Module，就会根据配置的 Loader 去找出对应的转换规则，对 Module 进行转换后，再解析出当前 Module 依赖的 Module。这些模块会以 Entry 为单位进行分组，一个 Entry 和其所有依赖的 Module 被分到一个组也就是一个 Chunk。最后 Webpack 会把所有 Chunk 转换成文件输出。在整个流程中 Webpack 会在恰当的时机执行 Plugin 里定义的逻辑