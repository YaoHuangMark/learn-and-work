/*
 * @Author: 黄遥
 * @Date: 2020-04-05 10:09:07
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-04-05 17:53:36
 * @Description: file content
 */
function getComponent() {
  // var element = document.createElement('div');
  // 在注释中使用了 webpackChunkName。这样做会导致我们的 bundle 被命名为 lodash.bundle.js ，而不是 [id].bundle.js 。
  // const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');

  // element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  // return element;
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
         var element = document.createElement('div');
    
         element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    
         return element;
    }).catch(error => 'An error occurred while loading the component');
};

getComponent().then(component => {
  document.body.appendChild(component)
})