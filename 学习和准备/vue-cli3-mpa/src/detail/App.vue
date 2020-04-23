<template>
  <div id="detail">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <p>detail</p>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'Detail',
  components: {
    // HelloWorld
  },
  data() {
    return {
      name: 'ceshi'
    }
  },
  beforeCreate() {
    console.log(this)
  },
  created() {
    console.log(this)
  }
}
</script>

<style>
#detail {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
