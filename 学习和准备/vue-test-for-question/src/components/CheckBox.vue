<!--
 * @Author: 黄遥
 * @Date: 2020-07-01 09:27:14
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-07-13 21:24:16
 * @Description: file content
--> 
<template>
  <input type="checkbox" :checked="checkbox" @change="$emit('change', $event.target.checked)">
</template>
<script>
export default {
  model: {
    prop: 'checkbox',
    event: 'change'
  },
  prop: {
    checkbox: Boolean
  },
  created() {
    console.log('checkboxcreated')
  },
  mounted() {
    console.log('checkboxmounted')
  }
}
</script>