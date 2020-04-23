/*
 * @Author: 黄遥
 * @Date: 2020-04-05 10:09:07
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-04-05 15:42:15
 * @Description: file content
 */
import _ from 'lodash'
import printMe from './print'
import './style.css'

function component() {
  var element = document.createElement('div')
  var btn = document.createElement('button')

  element.innerHTML = _.join(['hello', 'webpack'], '')

  btn.innerHTML = 'Click me and check the console!'
  btn.onclick = printMe

  element.appendChild(btn)

  return element
}

document.body.appendChild(component())

if(module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!');
    printMe();
  })
}