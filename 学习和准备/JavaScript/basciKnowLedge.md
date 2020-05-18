## Primitive type
- boolean
- null
- undefined
- number
- string
- symbol
> 虽然 typeof null 会输出 object，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。

## Object type
>在 JS 中，除了原始类型那么其他的都是对象类型了。对象类型和原始类型不同的是，原始类型存储的是值，对象类型存储的是地址（指针）。当你创建了一个对象类型的时候，计算机会在内存中帮我们开辟一个空间来存放值，但是我们需要找到这个空间，这个空间会拥有一个地址（指针）。
### typeof vs instanceof
typeof 对于原始类型来说，除了 null 都可以显示正确的类型
```javascript
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
```
typeof 对于对象来说
```javascript
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'
```
如果想判断对象的类型，可以使用 instanceof
```javascript
const Person = function() {}
const p1 = new Person()
p1 instanceof Person // true

var str = 'hello world'
str instanceof String // false

var str1 = new String('hello world')
str1 instanceof String // true
```
或者使用 Object.prototype.toString().call()
```javascript
var fun = function(){};
Object.prototype.toString.call(fun); // [object Function]
```
## 类型转换
1. 转 Boolean
除了 undefined、null、false、，NaN、''、0、-0，其他所有值都转为 true，包括所有对象
2. 对象转原始类型
对象在转换类型的时候，会调用内置的 [[ToPrimitive]] 函数，对于该函数来说，算法逻辑一般来说如下：
- 如果已经是原始类型了，那就不需要转换了
- 调用 x.valueOf()，如果转换为基础类型，就返回转换的值
- 调用 x.toString()，如果转换为基础类型，就返回转换的值
- 如果都没有返回原始类型，就会报错
3. 四则运算
加法运算中不同于其他几个运算符，它有以下几个特点
- 运算中其中一方为字符串，那么就会把另一方也转换为字符串
- 如果一方不是字符串或数字，那么会将它转换为数字或字符串
```javascript
1 + '1' // '11'
true + true // 2
4 + [1,2,3] // "41,2,3"
```
那么对于除了加法的运算符来说，只要其中一方是数字，那么另一方就会被转为数字
```javascript
4 * '3' // 12
4 * [] // 0
4 * [1, 2] // NaN
```
## this
this 实际上是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用。
箭头函数其实是没有 this 的，箭头函数中的 this 只取决包裹箭头函数的第一个普通函数的 this。
```javascript
function foo() {
  console.log(this.a)
}
var a = 1
foo()

const obj = {
  a: 2,
  foo: foo
}
obj.foo()

const c = new foo()
```
绑定规则：
- new 方式，优先级最高
- call、apply 显示绑定， bind 硬绑定
- obj.foo() 隐式绑定
- foo() 默认绑定
## == VS ===
对于 == 来说，如果对比双方的类型不一样的话，就会进行类型转换,假如我们需要对比 x 和 y 是否相同，就会进行如下判断流程：
1. 首先判断两者类型是否相同，相同的话就比较大小
2. 类型不同的话就进行类型转换
3. 会先判断是否在对比 null 和 undefined，是的话就返回 true
4. 判断两者类型是否为 string 和 number，是的话就会将字符串转换为 number
5. 判断其中一方是否为 boolean，是的话就将 boolean 转为 number 再判断
6. 判断其中一方是否为 object 且另一方为 string、number 或者 symbol，是的话就会把 object 转为原始类型再进行判断
>经典面试题：[] == ![] 和 {} == !{} 
true、false

对于 === 来说就简单多了，就是判断两者类型和值是否相同。
## 浅拷贝
可以使用 Object.assign，它会拷贝所有的属性值到新的对象中，如果属性值是对象的话拷贝的是地址，所以并不是深拷贝（对象的值存在堆中，地址存在栈中）
也可以使用拓展运算符 ... 来浅拷贝
如果接下来的值中还有对象的话，那么就只能使用深拷贝了
## 深拷贝
通常用 JSON.parse(JSON.stringify(object)) 来解决
但是这个方法也有局限性：
- 会忽略 undefined
- 会忽略 symbol
- 不能序列号函数
- 不能解决循环引用的对象
这时可以使用 lodash 的深拷贝函数
```javascript
function deepClone(obj) {
  function isObject(o) {
    return (typeof o === 'object' || typeof o === 'function') && o !== null
  }

  if (!isObject(obj)) {
    throw new Error('非对象')
  }

  let isArray = Array.isArray(obj)
  let newObj = isArray ? [...obj] : { ...obj }
  Reflect.ownKeys(newObj).forEach(key => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  })

  return newObj
}

let obj = {
  a: [1, 2, 3],
  b: {
    c: 2,
    d: 3
  }
}
let newObj = deepClone(obj)
newObj.b.c = 1
console.log(obj.b.c) // 2
```
## 原型
其实每个 JS 对象都有__proto__属性，这个属性指向了原型。这个属性在现在来说已经不推荐直接去使用它了，这只是浏览器在早期为了让我们访问到内部属性 [\[prototype]] 来实现的一个东西。

打开 constructor 属性我们又可以发现其中还有一个 prototype 属性，并且这个属性对应的值和先前我们在 __proto__ 中看到的一模一样。所以我们又可以得出一个结论：原型的 constructor 属性指向构造函数，构造函数又通过 prototype 属性指回原型，但是并不是所有函数都具有这个属性，Function.prototype.bind() 就没有这个属性。

其实原型链就是多个对象通过 __proto__ 的方式连接了起来。为什么 obj 可以访问到 valueOf 函数，就是因为 obj 通过原型链找到了 valueOf 函数。

- Object 是所有对象的爸爸，所有对象都可以通过 __proto__ 找到它
- Function 是所有函数的爸爸，所有函数都可以通过 __proto__ 找到它
- 函数的 prototype 是一个对象
- 对象的 __proto__ 属性指向原型， __proto__ 将对象和原型连接起来组成了原型链

## 原型继承和 Class 继承
### 组合继承
组合继承是最常用的继承方式
```javascript
function Parent(value) {
  this.val = value
}
Parent.prototype.getValue = function() {
  console.log(this.val)
}
function Child(value) {
  Parent.call(this, value)
}
Child.prototype = new Parent()

const child = new Child(1)

child.getValue() // 1
child instanceof Parent // true
```
以上继承的方式核心是在子类的构造函数中通过 Parent.call(this) 继承父类的属性，然后改变子类的原型为 new Parent() 来继承父类的函数。

这种继承方式优点在于构造函数可以传参，不会与父类引用属性共享，可以复用父类的函数，但是也存在一个缺点就是在继承父类函数的时候调用了父类构造函数，导致子类的原型上多了不需要的父类属性，存在内存上的浪费。
### 寄生组合继承
这种继承方式对组合继承进行了优化，组合继承缺点在于继承父类函数时调用了构造函数，我们只需要优化掉这点就行
```javascript
function Parent(value) {
  this.val = value
}
Parent.prototype.getValue = function() {
  console.log(this.val)
}

function Child(value) {
  Parent.call(this, value)
}
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: true,
    configurable: true
  }
})

const child = new Child(1)

child.getValue() // 1
child instanceof Parent // true
```
以上继承实现的核心就是将父类的原型赋值给了子类，并且将构造函数设置为子类，这样既解决了无用的父类属性问题，还能正确的找到子类的构造函数。
### Class 继承
以上两种继承方式都是通过原型去解决的，在ES6中，我们可以使用 class 去实现继承，并且实现起来很简单
```javascript
class Parent {
  constructor(value) {
    this.val = value
  }
  getValue() {
    console.log(this.val)
  }
}
class Child extends Parent {
  constructor(value) {
    super(value)
    this.val = value
  }
}
let child = new Child(1)
child.getValue() // 1
child instanceof Parent // true
// instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
```