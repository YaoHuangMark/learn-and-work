<template>
  <div class="hello">
    <!-- <div ref="msgDiv">{{msg}}</div>
    <div v-if="msg_1">Message got outside $nextTick: {{msg_1}}</div>
    <div v-if="msg_2">Message got inside $nextTick: {{msg_2}}</div>
    <div v-if="msg_3">Message got outside $nextTick: {{msg_3}}</div>
    <button @click="changeMsg">
      Change the Message
    </button>
    <div style="height: 1000px;"></div>
    <div style="position:relative;">
      <img :src="isLoadStart ? src : src_default" ref="theImg" id="theImg"/>
    </div> -->
    <mavon-editor v-model="value"></mavon-editor>
    <div ref="editor" style="text-align:left"></div>
    <!-- 通过设置 model，分别定义 prop 和 event 的绑定 -->
    <check-box v-model="checked"></check-box>
    <!-- slot scope -->
    <todo-list :filteredTools="lists">
      <template #todo="{ todo }">
        <span v-if="todo.type == 'name'">✓</span>
        {{todo.text}}
      </template>
    </todo-list>
    <render-box></render-box>
    <!-- .sync -->
    <sync-suger :val.sync="val" @add="changeMsg" name="12133" :age="msg"></sync-suger>
    {{val}}
    <extend-component></extend-component>
  </div>
</template>

<script>
// import tencent from '@/assets/tencent.png'
import E from 'wangeditor'
import Vue from 'vue/dist/vue.js'
import CheckBox from './CheckBox'
import todoList from './toDoList'
import renderBox from './renderBox'
import syncSuger from './syncSuger'
var editor
let extendComponent = Vue.extend({
  data: function() {
    return  {
      text: 'extendcomponent'
    }
  },
  template: `<div>{{text}}</div>`
})
// let extendComponent = new parent()
export default {
  name: 'HelloWorld',
  components: {
    CheckBox,
    todoList,
    renderBox,
    syncSuger,
    extendComponent
  },
  data() {
    return {
      src: require('@/assets/tencent.png'),
      src_default: require('@/assets/a.png'),
      isLoadStart: false,
      msg: 'Hello Vue.',
      msg_1: '',
      msg_2: '',
      msg_3: '',
      options: {
        content: 'content',
        editable: true,
        toolbar: [
          'add-more',
          'separator',
          'bold',
          'italic',
          'underline',
          // other toolbar buttons
          // name string
        ]
      },
      json: '',
      html: '',
      value: '',
      Title: '',
      Content: '',
      checked: false,
      lists: [{
        id: 1,
        type: 'names',
        text: 'text1'
      }, {
        id: 2,
        type: 'value',
        text: 'text2'
      }],
      val: 'syncsuger'
    }
  },
  created() {
    console.log('hello-created')
  },
  mounted() {
    console.log('hello-mounted')
    // this.addScrollListener()
    editor = new E(this.$refs.editor)
    editor.customConfig = {
      onchange: (html) => {
        console.log(html)
      }
    }
    editor.create()
    editor.txt.html('<p>dsffdfd</p><table border="0" width="100%" cellpadding="0" cellspacing="0"><tbody><tr><th>ds&nbsp;</th><th>ds&nbsp;</th></tr><tr><td style="text-align: center;">&nbsp;ds</td><td style="text-align: center;">&nbsp;ds</td></tr></tbody></table><p>fdf</p>')
    console.log(this.$attrs)
  },
  methods: {
    changeMsg() {
      this.msg = "Hello world."
      this.msg_1 = this.$refs.msgDiv.innerHTML
      this.$nextTick(() => {
        this.msg_2 = this.$refs.msgDiv.innerHTML
      })
      this.msg_3 = this.$refs.msgDiv.innerHTML
    },
    checkLazyLoad() {
      let toTop = document.getElementById('theImg').offsetTop
      let clientHeight = document.documentElement.clientHeight
      let scrollTop = document.documentElement.scrollTop
      console.log(toTop)
      if(toTop - scrollTop - clientHeight <= 100){
        this.isLoadStart = true
      }
    },
    addScrollListener() {
      let self = this
      document.addEventListener('scroll', self.checkLazyLoad)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
