/*
 * @Author: 黄遥
 * @Date: 2020-04-14 09:17:44
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-04-14 09:29:29
 * @Description: file content
 */
const arr = [4,1,3,5,6,8,8,43,23,13,2]
for(let i=0;i<arr.length;i++) {
  for(let j=i+1;j<arr.length;j++) {
    if(arr[i] > arr[j]) {
      let arr_j = arr[i]
      arr[i] = arr[j]
      arr[j] = arr_j
    }
  }
}
console.log(arr)