<!--
 * @Author: 黄遥
 * @Date: 2020-05-25 19:32:57
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-05-25 19:37:00
 * @Description: file content
--> 
## href
1. href 超文本引用，用来建立当前元素和文档之间的链接，常用的有 link、a
2. 浏览器会识别该文档为css文档，并行下载该文档，并且不会停止对当前文档的处理。这也是建议使用link，而不采用@import加载css的原因

## src
1. src 是 source 的缩写，src 的内容是页面必不可少的一部分，是引入。src 指向的内容会嵌入到文档中当前标签所在的位置，常用的有：img、script、iframe
2. 当浏览器解析到该元素时，会暂停浏览器的渲染，直到该资源加载完毕，这也是将 js 脚本放在底部而不是头部的原因