<!--
 * @Author: 黄遥
 * @Date: 2020-07-08 16:32:28
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-07-08 16:39:12
 * @Description: file content
--> 
扩展组件生成一个构造器，通常会与 $mount 一起使用
```javascript
var newCom = Vue.extend({
  template: '<div>extend</div>'
  // 或者使用 render 函数
  // render(h) {
  //   h('div', {
  //     text: 'extend'
  //   })
  // }
})
new newCom().$mount('#app')
// 或者
// let vdom = new newCom().$mount()
// document.getElementById('app').appendChild(vdom.$el)


// 除了上面的方式，还可以拓展已有的组件
let SuperComponent = Vue.extend(Component)
new SuperComponent({
    created() {
        console.log(1)
    }
})
new SuperComponent().$mount('#app')
```