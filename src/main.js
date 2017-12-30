// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '~/animate.css/animate.min.css'
import './style/style.less'

Vue.config.productionTip = false
Vue.prototype.$Host = 'http://127.0.0.1:8009/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
