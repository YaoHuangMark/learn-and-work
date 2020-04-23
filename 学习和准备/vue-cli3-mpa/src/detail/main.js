import Vue from 'vue'
import Detail from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Detail),
}).$mount('#detail')
