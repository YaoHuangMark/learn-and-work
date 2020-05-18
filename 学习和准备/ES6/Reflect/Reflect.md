<!--
 * @Author: 黄遥
 * @Date: 2020-05-16 15:55:09
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-05-17 10:20:40
 * @Description: file content
--> 
## 什么是 Reflect
为操作对象而提供的新 API
## 为什么要设计 Reflect
1. 将 Object 对象的属于语言内部的方法放到 Reflect 对象上，即从 Reflect 对象上拿 Object 对象内部方法
2. 将用老 Object 方法报错的情况下，改为返回 false
老写法
```javascript
try {
  Object.defineProperty(target, property, attributes);
  // success
} catch (e) {
  // failure
}
```
新写法
```javascript
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}
```
3. 让 Object 操作变成函数行为
老写法
```javascript
'name' in Object
```
新写法
```javascript
Reflect.has(Object,'name')
```
4. Reflect 与 Proxy 是相辅相成的，在 Proxy 上有的方法，在 Reflect 就一定有
```javascript
let target={}
let handler={
  set(target,proName,proValue,receiver){
    //确认对象的属性赋值成功
    let isSuccess=Reflect.set(target,proName,proValue,receiver)
    if(isSuccess){
      console.log("成功")
    }
    return isSuccess
  }
}
let proxy=new Proxy(target,handler)
```
确保对象的属性能正确赋值，广义上讲，即确保对象的原生行为能够正常进行，这就是Reflect的作用