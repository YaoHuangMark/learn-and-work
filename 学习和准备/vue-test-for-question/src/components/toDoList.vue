<!--
 * @Author: 黄遥
 * @Date: 2020-07-01 11:25:21
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-07-11 15:53:29
 * @Description: file content
--> 
<template>
  <ul>
    <li v-for="todo in filteredTools" :key="todo.id">
      <slot name="todo" :todo="todo">
        <!-- {{todo.text}} -->
      </slot>
    </li>
  </ul>
</template>
<script>
export default {
  props: ['filteredTools'],
  created() {
    console.log('todolist created')
  },
  mounted() {
    console.log('todolist mounted')
  }
}
</script>