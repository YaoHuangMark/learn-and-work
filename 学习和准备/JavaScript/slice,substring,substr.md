<!--
 * @Author: 黄遥
 * @Date: 2020-04-24 16:42:24
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-04-24 17:19:48
 * @Description: file content
 -->
```javascript
var str = "abcdefghijklmnopqrstuvwxyz";
console.log(str.slice(4,7));
console.log(str.substring(4,7));
console.log(str.substr(4,7));
```
>slice 返回 start 到 end 下标之间的字符，不包括 end； 若为负数时，则是从 strLength-start 或者 strLength-end 开始计算

>substring 提取从 indexStart 到 indexEnd（不包括）之间的字符。特别地：
如果 indexStart 等于 indexEnd，substring 返回一个空字符串。
如果省略 indexEnd，substring 提取字符一直到字符串末尾。
如果任一参数小于 0 或为 NaN，则被当作 0。
如果任一参数大于 stringName.length，则被当作 stringName.length。
如果 indexStart 大于 indexEnd，则 substring 的执行效果就像两个参数调换了一样。见下面的例子。

>substr 提取从 indexStart 开始，数量为 indexEnd 的字符, 如果 indexStart 为负数，则从末尾开始计算位置