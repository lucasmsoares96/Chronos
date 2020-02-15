import '@babel/polyfill'
import 'mutationobserver-shim'

import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'

import router from './plugins/router'
import store from './plugins/store'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
