class MyPromise {
  constructor(executor) {
    //控制状态，使用一次之后，接下来的都不被使用
    this.state = 'PENDING';
    this.value = null;
    this.reason = null;
    //存放成功回调的函数
    this.onFulfilledCallbacks = [];
    //存放失败回调的函数
    this.onRejectedCallbacks = [];

    //定义resolve函数
    const resolve = value => {
      if(this.state === 'PENDING') {
        this.value = value;
        this.state = 'FULFILLED';
        this.onFulfilledCallbacks.map(fn => fn());
      }
    }

    //定义reject函数
    const reject = value => {
      if(this.state === 'PENDING') {
        this.reason = value;
        this.state = 'REJECTED';
        this.onRejectedCallbacks.map(fn => fn());
      }
    }

    //executor方法可能会抛出异常，需要捕获
    try {
      // 将resolve和reject函数给使用者
      executor(resolve,reject);
    } catch (error) {
      //如果在函数中抛出异常则将它注入reject中
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    if(this.state === 'PENDING') {
      this.onFulfilledCallbacks.push(() => {
        onFulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        onRejected(this.value);
      })
    }
    if(this.state === 'FULFILLED') {
      onFulfilled(this.value)
    }
    if(this.state === 'REJECTED') {
      onRejected(this.reason)
    }
  }
}
const mp = new MyPromise((resolve,reject) => {
  setTimeout(() => {
    resolve('******** i love you *******');
  }, 0);
})
mp.then(suc => {
  console.log(1111, suc)
},err => {
  console.log('******** no, you do not *******',err)
})