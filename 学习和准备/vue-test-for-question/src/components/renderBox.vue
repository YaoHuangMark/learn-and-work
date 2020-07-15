<!--
 * @Author: 黄遥
 * @Date: 2020-07-07 11:02:26
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-07-07 11:32:17
 * @Description: file content
--> 
<script>
export default {
  render: h => {
    return h('h1', {
      class: {
        title: true
      },
      style: {
        color: 'red'
      }
    }, 'im a loser')
  }
}
</script>