/*
 * @Author: 黄遥
 * @Date: 2020-05-11 09:03:48
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-05-11 14:18:08
 * @Description: 
 * 1. 要求最大并发数 maxNum
 * 2. 每当有一个请求返回，就留下一个空位，可以增加新的请求
 * 3. 所有请求完成后，结果按照 urls 里面的顺序依次打出
 */
function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function() {
      console.log(url, "加载完成");
      resolve(img);
    };
    img.onerror = function() {
      reject(new Error('Error at:' + url));
    };
    img.src = url;
  })
}
function multiRequest(urls, maxNum) {
  const firstMaxNum = urls.splice(0, maxNum);
  let promises = firstMaxNum.map((url, index)=>{
    return loadImg(url).then(()=>{
      return index
    })
  })
  return urls.reduce((res, cur)=>{
    return res.then(()=>{
      return Promise.race(promises)
    }).then((idx)=>{
      promises[idx] = loadImg(cur).then(()=>{
        return idx
      })
    })
  }, Promise.resolve()).then(()=>{
    return Promise.all(promises)
  })  
}
let urls = ['https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100']
multiRequest(urls, 4).then(()=>{
console.log('finish')
})