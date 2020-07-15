/*
 * @Author: 黄遥
 * @Date: 2020-07-10 13:53:24
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-07-10 14:42:08
 * @Description: file content
 */ 
// 监听器
function observe(obj) {
  if(!obj || typeof obj !== 'object') {
    return
  }
  Object.keys(obj).forEach(key => {
    observeReative(obj,key,obj[key])
  })
}
function observeReative(obj, key, val) {
  observe(obj) // 递归子属性
  let dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log('get value')
      if(Dep.target) {
        dep.addSub(Dep.target)
      }
      return val
    },
    set: function(newVal) {
      console.log('change value')
      val = newVal
      // 指向 watcher 的 update 方法
      dep.notify()
    }
  })
}

// 通过 Dep 解耦属性的依赖和更新操作
class Dep {
  constructor() {
    this.subs = []
  }
  // 添加依赖
  addSub(sub) {
    this.subs.push(sub)
  }
  // 更新
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
// 全局属性，通过该属性配置 Watcher
Dep.target = null

// 订阅函数
class Watcher {
  constructor(obj, key, cb) {
    // 将 Dep.target 指向自己
    // 然后触发属性的 getter 添加监听
    // 最后将 Dep.target 置空
    Dep.target = this
    this.cb = cb
    this.obj = obj
    this.key = key
    this.value = obj[key]
    Dep.target = null
  }
  update() {
    // 获得新值
    this.value = this.obj[this.key]
    // 调用 update 方法更新 Dom
    this.cb(this.value)
  }
}

