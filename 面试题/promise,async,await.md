## Promise 的特点是什么，分别有什么优缺点？什么是 Promise 链？Promise 构造函数执行和 then 函数执行有什么区别？
- 有三个状态（pending、solve、reject）
- 状态一旦改变就不能再改变了
- 构造 Promise 的时候，构造函数内部的代码是立即执行的
- Promise 实现了链式调用，每次调用 then 之后返回的都是一个新的 Promise，如果在 then 中使用了 return，那么 return 的值会被 Promise.resolve() 包装
- promise 可以解决回调地狱
- 无法取消 Promise、错误需要通过回调函数捕捉

## async 及 await 的特点，它们的优点和缺点分别是什么，await 的原理是什么
一个函数如果加上 async ，那么该函数就会返回一个 Promise
async 就是把函数返回值使用 Promise.resolve() 包裹一下，和 then 中处理返回值是一样的
async 和 await 优势在于处理 then 的调用链，能更清晰准确的写出代码
await 将异步代码改造成了同步代码，如果多个异步代码没有依赖性却使用了 await 会导致性能上的降低

```javascript
let a = 0
let b = async () => {
  a = a + await 10
  console.log('2', a) // -> '2' 10
}
b()
a++
console.log('1', a) // -> '1' 1
```
- 首先函数 b 先执行，在执行到 await 10 之前变量 a 还是 0，因为 await 内部实现了 generator ，generator 会保留堆栈中东西，所以这时候 a = 0 被保存了下来
- 因为 await 是异步操作，后来的表达式不返回 Promise 的话，就会包装成 Promise.reslove(返回值)，然后会去执行函数外的同步代码
- 同步代码执行完毕后开始执行异步代码，将保存下来的值拿出来使用，这时候 a = 0 + 10

>await 内部实现了 Generator ，其实 await 就是 generator 加上 Promise 的语法糖，且内部实现了自动执行 generator。