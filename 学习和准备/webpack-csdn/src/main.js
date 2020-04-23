import './style.css'
import _ from 'lodash'
console.log('hello webpack')

function printArr(){
  const arr = Array(5).fill('6');
  arr.map(item => {
    console.log(item)
  })
};
printArr();

function component() {
  var element = document.createElement('div')

  element.innerHTML = _.join(['hello', 'webpack'], '')

  return element
}

document.body.appendChild(component())