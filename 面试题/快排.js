/*
 * @Author: 黄遥
 * @Date: 2020-04-20 21:36:29
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-04-20 21:44:38
 * @Description: file content
 */
function fastRow(arr) {
  if (arr.length <= 1) return arr
  // 选择基准位置
  let benchNum = Math.floor(arr.length / 2)
  // 找到基准位置的元素
  let benchElemet = arr.splice(benchNum, 1)[0]
  // 分成左右两边开始快排
  let left = [];
  let right = [];
  arr.forEach(item => {
    if (item < benchElemet) {
      left.push(item)
    } else {
      right.push(item)
    }
  });
  // 最后组合起来
  return fastRow(left).concat([benchElemet], fastRow(right))
}

console.log(fastRow([2,3,1,5,10,2,4,1]))
console.log(fastRow([2,1]))
console.log(fastRow([2]))