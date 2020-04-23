/*
 * @Author: 黄遥
 * @Date: 2020-04-02 16:37:39
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-04-02 17:01:25
 * @Description: file content
 */
import router from '../../router'
// 引入 html 模版，会被作为字符串引入
import template from './index.html'
// 引入 css，会生成 <style> 块插入到 <head> 头中
import './style.css'

// 导出类
export default class {
  mount(container) {
    document.title = 'bar'
    container.innerHTML = template
    container.querySelector('.bar_gofoo').addEventListener('click',() => {
      // 调用 router.go 方法加载 /foo 页面
      router.go('/foo')
    })
  }
}