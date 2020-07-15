<!--
 * @Author: 黄遥
 * @Date: 2020-06-09 17:21:45
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-06-13 16:30:15
 * @Description: file content
--> 
## opacity=0
元素会隐藏起来，但不会改变页面布局，如果改元素绑定了事件，还是会触发事件，例如 click 事件
会触发重绘「repaint」
## visibility=hidden
该元素隐藏起来，不会改变布局，但是不会触发该元素已经绑定的事件
会触发重绘「repaint」
## display=none
元素隐藏起来，会改变页面布局，可以理解为把元素删除了
会触发回流「reflow」