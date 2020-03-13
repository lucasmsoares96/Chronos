import '@babel/polyfill'
import 'mutationobserver-shim'
import './plugins/bootstrap-vue'
import './plugins/msgs'
import './plugins/axios'

import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'

import router from './plugins/router'
import store from './plugins/store' 

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
