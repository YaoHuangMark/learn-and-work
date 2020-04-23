<template>
  <div>
    <p>请使用正则表达式实现方法 numSplit，为任意数字添加千分位分隔符，注意参数校验</p>
    <p>例如：numSplit(1234567.1234); //结果1,234,567.1234</p>
    <p>{{numSplit(-123.123)}}</p>
    <p>{{numSplit(12344.123)}}</p>
    <p>{{numSplit(12345678.1234)}}</p>

    <ul id="list">
      <li>点击我弹出0</li>
      <li>点击我弹出1</li>
      <li>点击我弹出2</li>
      <li>点击我弹出3</li>
    </ul>
  </div>
</template>
<script>
export default {
  methods: {
    numSplit (val) {
      if(isNaN(val)) return
      let a, b
      let newVal = String(val)
      if (String(val).indexOf('.') >= 0 ) {
        a = newVal.split('.')[0]
        b = newVal.split('.')[1]
      } else {
        a = newVal
        b = ''
      }
      var c = /(?=(?!(\b))(\d{3})+$)/g;
      a = a.replace(c,',');
      return a + '.' + b
    }
  },
  mounted() {
    document.querySelector('#list').addEventListener('click', (el) => {
      console.log(el)
      console.log(Array.from(document.querySelector('#list').children).indexOf(el.target))
    })
  }
}
</script>