<!--
 * @Author: 黄遥
 * @Date: 2020-06-03 16:07:07
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-07-08 08:51:28
 * @Description: file content
--> 
## js 数据类型
- 基本数据类型
string、number、null、undefined、boolean、symbol(ES6)
- 引用数据类型
Object
- 复杂数据类型(ES6)
Set、Map、WeakSet、WeakMap、TypedArray

## 深拷贝、浅拷贝
只针对 Object 类型。因为 Object 类型在栈中存放引用地址，在堆中存放值，所以普通赋值只是复制了一个栈中引用地址，当一个值改变时，另一个值也会改变，因为它们引用的都是同一个堆中的值
### 浅拷贝实现方式
1. 直接赋值
2. Object.assign
3. Array.prototype.concat
4. Array.prototype.slice
- 如果该元素是个对象引用，slice 会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象
- 对于字符串、数字及布尔值来说，slice 会拷贝这些值到新的数组里。在别的数组里修改这些字符串或数字或布尔值，将不会影响另一个数组
对这种浅层次不受影响，但是深层次的会受影响
```javascript
let arr = [1, 3,[5,8], {
    username: ' kobe'
    }];
let arr4 = arr.concat();
arr4[1] = 2
arr4[2][0] = 9
console.log(arr,arr4);
```
可以看到这种二级属性还是没能拷贝成功。所以slice和concat方法并不是真正的深拷贝方法

### 深拷贝方法
1. 递归
遍历对象、数组直到里边都是基本数据类型，然后再去复制，就是深拷贝
```javascript
// 定义一个深拷贝函数  接收目标target参数
function deepClone(target) {
    // 定义一个变量
    let result;
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
        // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = []; // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(deepClone(target[i]))
            }
         // 判断如果当前的值是null的话；直接赋值为null
        } else if(target===null) {
            result = null;
         // 判断如果当前的值是一个RegExp对象的话，直接赋值    
        } else if(target.constructor===RegExp){
            result = target;
        }else {
         // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {};
            for (let i in target) {
                result[i] = deepClone(target[i]);
            }
        }
     // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target;
    }
     // 返回最终结果
    return result;
}
```
```javascript
function deepClone(obj){
    var newObj= obj instanceof Array?[]:{};
    for(var i in obj){
       newObj[i]=typeof obj[i]=='object'?  
       deepClone(obj[i]):obj[i];    
    }
    return newObj;
}
```
2. JSON.parse(JSON.stringify())
用 JSON.stringify 将对象转成 JSON 字符串，再通过 JSON.parse 解析成对象，一去一来，新的对象产生了，而且对象会开辟新的栈，实现深拷贝
这种方法虽然可以实现数组或对象深拷贝，但不能处理函数。

## 判断类型
1. typeof
Array、Object、null、Date、RegExp、Error 这几种类型会被判断为 Object
Number、String、Boolean、Function、undefined 可以正确判断
2. instanceof
instanceof 运算符需要指定一个构造函数，或者指定一个特定的类型，它用来判断这个构造函数的原型是否在给定对象的原型链上
```javascript
console.log(
    123 instanceof Number, //false
    'dsfsf' instanceof String, //false
    false instanceof Boolean, //false
    [1,2,3] instanceof Array, //true
    {a:1,b:2,c:3} instanceof Object, //true
    function(){console.log('aaa');} instanceof Function, //true
    undefined instanceof Object, //false
    null instanceof Object, //false
    new Date() instanceof Date, //true
    /^[a-zA-Z]{5,20}$/ instanceof RegExp, //true
    new Error() instanceof Error //true
)
```
可以发现：
Number、String、Boolean 没有检测出他们的类型，但是如果是下面的写法则可以检测出来
```javascript
var num = new Number(123);
var str = new String('ssss');
var bool = new Boolean(false);
```
还需要注意 null 和 undefined 都返回了 false，这是因为它们的类型就是自身，并不是 Object 创造出来它们，所以返回了 false
3. constructor
constructor是prototype对象上的属性，指向构造函数。根据实例对象寻找属性的顺序，若实例对象上没有实例属性或方法时，就去原型链上寻找，因此，实例对象也是能使用constructor属性的。

如果输出一个类型的实例的constructor，就如下所示：
```javascript
console.log(new Number(123).constructor)
//ƒ Number() { [native code] }
```
可以看到它指向了Number的构造函数，因此，可以使用num.constructor==Number来判断一个变量是不是Number类型的。
```javascript
var num  = 123;
var str  = 'abcdef';
var bool = true;
var arr  = [1, 2, 3, 4];
var json = {name:'wenzi', age:25};
var func = function(){ console.log('this is function'); }
var und  = undefined;
var nul  = null;
var date = new Date();
var reg  = /^[a-zA-Z]{5,20}$/;
var error= new Error();

function Person(){
  
}
var tom = new Person();

// undefined和null没有constructor属性
console.log(
    tom.constructor==Person,
    num.constructor==Number,
    str.constructor==String,
    bool.constructor==Boolean,
    arr.constructor==Array,
    json.constructor==Object,
    func.constructor==Function,
    date.constructor==Date,
    reg.constructor==RegExp,
    error.constructor==Error
);
//所有结果均为true
```
除了 undefined 和 null 之外，其他类型都可以通过 constructor 属性来判断类型
4. 使用 toString() 检测对象类型
可以通过 toString() 来获取每个对象的类型。为了每个对象都能通过 Object.prototype.toString() 来检测，需要以 Function.prototype.call() 或者 Function.prototype.apply() 的形式来使用，传递要检查的对象作为第一个参数，称为 thisArg
```javascript
var toString = Object.prototype.toString;

toString.call(123); //"[object Number]"
toString.call('abcdef'); //"[object String]"
toString.call(true); //"[object Boolean]"
toString.call([1, 2, 3, 4]); //"[object Array]"
toString.call({name:'wenzi', age:25}); //"[object Object]"
toString.call(function(){ console.log('this is function'); }); //"[object Function]"
toString.call(undefined); //"[object Undefined]"
toString.call(null); //"[object Null]"
toString.call(new Date()); //"[object Date]"
toString.call(/^[a-zA-Z]{5,20}$/); //"[object RegExp]"
toString.call(new Error()); //"[object Error]"
```
这样可以看到使用 Object.prototype.toString.call() 的方法来判断一个变量的类似是最准确的方法
封装一个获取变量准确类型的函数
```javascript
function getType(obj) {
  var type = typeof obj
  if(type != 'object') return type
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');
}
```
## 为什么字符串类型可以调用构造函数String的方法，却又不是它的实例
在读取字符串的时候会创建一个对象，但是这个对象只是临时的，所以我们称它为临时对象，学术名字叫包装对象，说它临时，是因为我们在读取它的属性的时候，js会把这个string字符串通过new String()方式创建一个字符串对象，一旦引用结束，这个对象就被销毁了。
https://blog.csdn.net/weixin_34268310/article/details/93548543