<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <HelloWeb/>
    <HelloPack/>
    <MyParent/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import HelloWeb from './components/HelloWeb'
import HelloPack from './components/HelloPack'
import MyParent from './components/MyParent'

export default {
  name: 'App',
  components: {
    HelloWorld,
    HelloWeb,
    HelloPack,
    MyParent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
