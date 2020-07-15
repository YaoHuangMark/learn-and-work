/*
 * @Author: 黄遥
 * @Date: 2020-07-03 16:55:40
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-07-07 10:55:21
 * @Description: file content
 */ 
import Vue from 'vue'
import Message from './message.vue'
const MESSAGE = {
  animateTime: '',
  deration: '',
  install(Vue) {
    if (typeof window != 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('Message', Message)
    function msg(type, text, callBack) {
      let msg
      let deration = MESSAGE.deration
      if (typeof text == 'string') {
        msg = text
      } else if (typeof text == 'object') {
        msg = text.msg || ''
        if (text.deration) {
          deration = text.deration
        }
      }
      let msgCompiler = Vue.extend({ // 继承 Vue 类，生成一个子类
        render(h) {
          let props = {
            type,
            text: msg,
            show: this.show
          }
          return h('message',{props})
        }
      })
      let newMessage = new msgCompiler()
      let vm = newMessage.$mount() // 挂载实例
      let el = vm.$el // 拿到跟 DOM 元素
      document.body.appendChild(el)
      vm.show = true
    }
  }
}