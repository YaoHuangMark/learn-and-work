<!--
 * @Author: 黄遥
 * @Date: 2020-06-05 09:01:23
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-07-07 16:26:01
 * @Description: file content
--> 
## call
使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数
可以用来改变函数的 this
当第一个参数是 null、undefined 的时候，默认指向 window
```javascript
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

console.log(new Food('cheese', 5).name);
// expected output: "cheese"
```
## apply
和 call 一样，只不过后面的参数是以数组的形式传递。
## bind
创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
可以用 bind 方法实现函数柯里化
```javascript
// 实现一个 bind 函数
Function.prototype.bind=function(obj,arg){
  var arg=Array.prototype.slice.call(arguments,1);
  var context=this;
  var bound=function(newArg){
    arg=arg.concat(Array.prototype.slice.call(newArg));
    return context.apply(obj,arg);
  }
  var F=function(){}
  //这里需要一个寄生组合继承
  F.prototype=context.prototype;
  bound.prototype=new F();
  return bound;
}
```

## 柯里化
把接受多个参数的函数变换成接受一个单一元素的函数，并且返回接受余下的参数而且返回结果的新函数的技术

## new
创建一个用户定义的对象类型的实例或者具有构造函数的内置对象的实例子，new 关键字会进行如下的操作
1. 创建一个空对象
2. 链接该对象（即设置该对象的构造函数）到另一个对象
3. 将新创建的对象作为 this 的上下文
4. 如果函数没有返回对象，则返回 this