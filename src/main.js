// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import { MessageBox, Toast } from 'mint-ui'
import config from '@/lib/config'
import '~/animate.css/animate.min.css'
import './style/style.less'
import 'mint-ui/lib/style.css'

// Vue.component(MessageBox.name, MessageBox);
Vue.prototype.$MessageBox = MessageBox
Vue.prototype.$Toast = Toast
Vue.config.productionTip = false
Vue.prototype.$SocketHost = config.socketHost
//Vue.prototype.$SocketHost = 'http://118.31.19.0:8009'
Vue.prototype.$Host = config.host
Vue.prototype.$wcApi = config.wcApi

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
