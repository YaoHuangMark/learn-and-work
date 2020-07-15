<!--
 * @Author: 黄遥
 * @Date: 2020-07-08 16:10:26
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-07-08 16:17:25
 * @Description: file content
--> 
<template>
  <div>
    <button @click="showMe">changeSync</button>
  </div>
</template>
<script>
export default {
  props: ['val'],
  mounted() {
    console.log(this)
  },
  methods: {
    showMe() {
      this.$emit('update:val', 'show.sync')
    }
  }
}
</script>