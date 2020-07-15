<!--
 * @Author: 黄遥
 * @Date: 2020-05-26 14:54:13
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-05-26 22:01:37
 * @Description: file content
--> 
## 目标实现
1. 双向绑定原理
2. 实现 {{}}、v-model、v-bind（:）、v-on（@）
3. 新增属性的双向绑定处理

### 双向绑定
> Vue 双向绑定是通过对数据劫持结合发布者-订阅者模式实现
Vue 通过 Object.defineProperty 来实现数据劫持，会递归遍历 data 中的每个属性，给属性添加对应的 get 和 set 方法，
对数据进行读取和赋值操作时就分别调用 get 和 set 方法
```javascript
Object.defineProperty(data, key, {
  enumerable: true,
  configurable: false,
  get: function() {
    return val
  },
  set: function(newVal) {
    // do something
  }
})
```
> 实现双向绑定首先要对数据监听，需要一个 「Observe」（监听器），监听所有属性，如果属性发生变化，会调用 getter 和 setter，再去告诉「订阅者」 Watcher 是否需要更新。由于订阅者有很多个，需要一个「消息订阅器」Dep 来专门收集这些订阅者，然后在 Observe 和 Watcher 之间进行统一管理。还需要一个「指令解析器」Complie，对每个元素进行扫描和解析，将相关指令对应初始化成一个订阅者 Watcher，并替换模版数据或绑定函数。当订阅者 Watcher 接收到相应属性的变化，就会执行对应的更新函数，从而更新视图

### 实现 Observe
Observe 是一个数据监听器，核心方式 Object.defineProperty，如果要监听所有属性的话，则需要通过递归遍历，对每个子属性都 defineProperty
```javascript
/**
 * 监听器构造函数
 * @param {object} data 被监听数据
 * 
 */
function Observer(data) {
  if (!data || typeof data !== 'object') return;
  this.data = data
  this.walk(data);
}
Observer.prototype = {
  /**
   * 属性遍历
   */
  walk: function(data) {
    var self = this;
    Object.keys(data).forEach(function(key) {
      self.defineReactive(data, key, data[key]);
    })
  },
  /**
   * 监听函数
   */
  defineReactive: function(data, key, val) {
    observe(val);
    Object.defineProperty(data, key, {
      enumerable: true, // 属性是否出现在对象的枚举属性中
      configurable: true, // 为true时，属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除
      get: function() {
        return val;
      },
      set: function(newVal) {
        if (newVal === val) return;
        val = newVal;
        console.log("属性：" + key + "被监听了，现在值为：" + newVal);
        updateView(newVal)
      }
    });
    updateView(val);
  }
}
/**
 * 监听器
 * @param {Object} data 被监听对象
 */
function observe(data) {
  return new Observer(data)
}
/**
 * vue 构造函数
 * @param {Object} options 所有入参
 */
function MyVue(options) {
  this.vm = this;
  this.data = options.data;
  // 监听数据
  observe(this.data)
  return this;
}
/**
 * 更新视图
 * @param {*} val
 */
function updateView(val) {
  var $name = document.querySelector("#name");
  $name.innerHTML = val;
}
var myvm = new MyVue({
  el: "#demo",
  data: {
    name: "hello word"
  }
});
```
### 实现 Dep
在流程介绍中，我们需要创建一个可以管理订阅者的订阅器「Dep」，主要负责收集订阅者，属性变化的时候执行相应的订阅者，更新函数。稍加改造 Observer ，就可以插入订阅器
```javascript
Observer.prototype = {
  // ...

  /**
   * 监听函数
   */
  defineReactive: function(data, key, val) {
    var dep = new Dep();

    observe(val);

    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function() {
        // 判断是否需要添加订阅者，与实际页面DOM有关联的data属性才添加相应的订阅者
        if (Dep.target) {
          // 添加一个订阅者
          dep.addSub(Dep.target)
        }
        return val;
      },
      set: function(newVal) {
        if (newVal === val) return;
        val = newVal;
        console.log("属性：" + key + "被监听了，现在值为：" + newVal);
        
        // 通知所有订阅者
        dep.notify(newVal)
      }
    });
    updateView(val);

    // 订阅器标识本身实例
    Dep.target = dep;
    // 强行执行 getter，往订阅器中添加订阅者
    var v = data[key]
    // 释放自己
    Dep.target = null
  }
}
/**
 * 订阅器
 */
function Dep() {
  this.subs = [];
  this.target = null;
}
Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub);
    console.log('this subs: ', this.subs);
  },
  notify: function(data) {
    this.subs.forEach(function(sub) {
      sub.update(data);
    })
  },
  update: function(val) {
    updateView(val)
  }
}
```
> PS:将订阅器Dep添加到一个订阅者设计到getter里面，是为了让Watcher初始化进行触发

### 实现 Watcher
> 订阅者初始化的时候需要将自己添加到订阅器 Dep 中，那该如何添加呢？我们已经知道监听器 Observer 是在 get 函数执行添加了订阅者 Watcher 的操作，
所以我们只要在订阅者 Watcher 初始化的时候触发对应的 get 函数去执行添加订阅者操作。那么，怎样去触发 get 函数？很简单，只需获取对应的属性值就可以触发了，因为我们已经用Object.defineProperty监听了所有属性。vue在这里做了个技巧处理，就是在我们添加订阅者的时候，做一个判断，判断是否是事先缓存好的Dep.target，在订阅者添加成功后，把target重置null即可。
```javascript
// ...

/**
 * 订阅者
 * @param {Object} vm vue 对象
 * @param {String} exp 属性值
 * @param {Function} cb 回调函数
 */
function Watcher(vm, exp, cb) {
  this.vm = vm;
  this.exp = exp;
  this.cb = cb;
  // 将自己添加到订阅器
  this.value = this.get();
}

Watcher.prototype = {
  update: function() {
    this.run();
  },
  run: function() {
    var value = this.vm.data[this.exp];
    var oldVal = this.value;

    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  },
  get: function() {
    // 缓存自己 做个标记
    Dep.target = this;

    // 强制执行监听器里的get函数
    // this.vm.data[this.exp]调用getter，添加一个订阅器 sub，存入到全局变量 subs
    val value = this.vm.data[this.exp];

    // 释放自己
    Dep.target = null;

    return value;
  }
};
/**
 * vue构造器
 * @param {Object} options 所有入参
 */
function MyVue(options) {
  this.vm = this;
  this.data = options.data;
  observe(this.data);
  var $name = document.querySelector("#name");

  // 给 name 属性添加一个订阅者到订阅器，当属性发生变化后，触发回调
  var w = new Watcher(this, "name", function(val) {
    $name.innerHTML = val;
  });

  return this;
}
```