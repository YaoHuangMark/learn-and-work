/*
 * @Author: 黄遥
 * @Date: 2020-04-20 22:00:51
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-06-20 21:27:59
 * @Description: file content
 */
// 查询一个数是否能由数组里的数组成，能的话返回组合下标
function demo(act, arr) {
  let str = String(act).split('')
  let st = '';
  console.log(str)
  for(let i=0;i<str.length;i++) {
    if (arr.indexOf(Number(str[i])) < 0) return false;
    st += `${arr.indexOf(Number(str[i]))},`
  }
  return st
}
console.log(demo(12,[2,2,1]))

// 用正则把a字符串替换成b字符串
function aReplace(a, b, str) {
  return str.replace(/a/g, b)
}
console.log(aReplace('a', 'b', 'adfdseaeaa'))

function foo() {
  var a = 1
  let b = 2
  {
    let b = 3
    var c = 4
    let d = 5
    console.log(a)
    console.log(b)
  }
  console.log(b)
  console.log(c)
  console.log(d)
}
foo()