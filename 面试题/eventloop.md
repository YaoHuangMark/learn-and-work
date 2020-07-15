<!--
 * @Author: 黄遥
 * @Date: 2020-07-13 23:09:24
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-07-14 08:38:34
 * @Description: file content
--> 
## Event Loop
在JavaScript中，任务被分为两种，一种宏任务（MacroTask）也叫Task，一种叫微任务（MicroTask）
## MacroTask 宏任务
script全部代码、setTimeout、setInterval、setImmediate（浏览器暂时不支持，只有IE10支持，具体可见MDN）、I/O、UI Rendering
## MicroTask 微任务
Process.nextTick（Node独有）、Promise、Object.observe(废弃)、MutationObserver
## 浏览器中的 Event Loop
Javascript 有一个 main thread 主线程和 call-stack 调用栈(执行栈)，所有的任务都会被放到调用栈等待主线程执行
## JS 调用栈
JS调用栈采用的是后进先出的规则，当函数执行的时候，会被添加到栈的顶部，当执行栈执行完成后，就会从栈顶移出，直到栈内被清空
## 同步任务和异步任务
Javascript单线程任务被分为同步任务和异步任务，同步任务会在调用栈中按照顺序等待主线程依次执行，异步任务会在异步任务有了结果后，将注册的回调函数放入任务队列中等待主线程空闲的时候（调用栈被清空），被读取到栈内等待主线程的执行。
![Image](https://picb.zhimg.com/80/v2-55c58a901cf835e5e308e4360694505f_720w.jpg)


执行栈在执行完同步任务后，查看执行栈是否为空，如果执行栈为空，就会去执行Task（宏任务），每次宏任务执行完毕后，检查微任务(microTask)队列是否为空，如果不为空的话，会按照先入先出的规则全部执行完微任务(microTask)后，设置微任务(microTask)队列为null，然后再执行宏任务，如此循环