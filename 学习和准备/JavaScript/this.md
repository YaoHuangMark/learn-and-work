<!--
 * @Author: 黄遥
 * @Date: 2020-06-01 13:48:44
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-06-01 14:35:06
 * @Description: file content
--> 
this 关键字被自动定义在所有函数的作用域中。
词法作用域：定义在词法阶段的作用域，换句话说，词法作用域是由你在写代码时将变量和块作用域写在哪里来决定的。
this既不指向函数自身也不指向函数的词法作用域，this实际上是在函数被调用时发生的绑定，它完全取决于在哪里被调用，代表当前执行的主体。
## call、apply、bind
### call
将 fn 的 this 指向第一个参数，并且指向 fn
```javascript
// 非严格模式
var obj = {
  name: 'call'
}
function fn(num1) {
  console.log(this.name + num1)
  console.log(this)
}
fn.call(obj,2) // call2 window
fn.call() // this -> window
fn.call(null) // this -> window
fn.call(undefined) // this -> window
// 严格模式
fn.call() // this -> undefined
fn.call(null) // this -> null
fn.call(undefined) // this -> undefined
```
### apply
apply 和 call 的作用一样，call在给fn传递参数的时候，是一个个的传递值的，而apply不是一个个传，而是把要给fn传递的参数值统一的放在一个数组中进行操作。但是也相当子一个个的给fn的形参赋值。总结一句话:call第二个参数开始接受一个参数列表,apply第二个参数开始接受一个参数数组。
### bind
bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用