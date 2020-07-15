<!--
 * @Author: 黄遥
 * @Date: 2020-07-13 14:14:55
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-07-13 14:42:33
 * @Description: file content
--> 
## 视口单位
在桌面端，视口指的是在桌面端，指的是浏览器的可视区域；而在移动端，它涉及三个视口：Layout Viewport（布局视口）、Visual Viewport（视觉视口）、Ideal Viewport（理想视口）。
视口单位中的“视口”，桌面端指的是浏览器的可视区域；移动端指的就是Viewport中的Layout Viewport，“视区”所指为浏览器内部的可视区域大小，即window.innerWidth/window.innerHeight大小，不包含任务栏标题栏以及底部工具栏的浏览器区域大小。
根据 CSS3 规范，视口单位主要包括以下4个：
1. vw：1vw 等于视口宽度的 1%
2. vh：1vh 等于视口高度的 1%
3. vmin：选取 vw 和 vh 中最小的那个
4. vmax：选取 vw 和 vh 中最大的那个
vh and vw：相对于视口的高度和宽度，而不是父元素的（CSS百分比是相对于包含它的最近的父元素的高度和宽度）。1vh 等于1/100的视口高度，1vw 等于1/100的视口宽度

## meta viewport
![Image](https://images0.cnblogs.com/blog/130623/201407/300958521655944.png)
![Image](https://images0.cnblogs.com/blog/130623/201407/300958547434256.png)
现在我们已经有两个viewport了：layout viewport 和 visual viewport。但浏览器觉得还不够，因为现在越来越多的网站都会为移动设备进行单独的设计，所以必须还要有一个能完美适配移动设备的viewport。所谓的完美适配指的是，首先不需要用户缩放和横向滚动条就能正常的查看网站的所有内容；第二，显示的文字的大小是合适，比如一段14px大小的文字，不会因为在一个高密度像素的屏幕里显示得太小而无法看清，理想的情况是这段14px的文字无论是在何种密度屏幕，何种分辨率下，显示出来的大小都是差不多的。当然，不只是文字，其他元素像图片什么的也是这个道理。ppk把这个viewport叫做 ideal viewport，也就是第三个viewport——移动设备的理想viewport。
```javascript
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
```
| width | 设置 Layout viewport 的宽度，为一个正整数，或字符串“device-width” |
| ----  | ---- |
| initial-scale | 设置页面的初始缩放值，为一个数字，可以带小数 |
| minimum-scale | 允许用户的最小缩放值，为一个数字，可以带小数 |
| maxmum-scale  | 允许用户的最大缩放值，为一个数字，可以带小数 |
| height | 设置 layout viewport 的高度，这个属性对我们并不重要，很少使用 |
| user-scalable | 是否允许用户进行缩放，值为“no”或“yes”，no 代表不允许，yes 代表允许 |