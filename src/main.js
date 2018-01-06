// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import { MessageBox } from 'mint-ui';
import '~/animate.css/animate.min.css'
import './style/style.less'
import 'mint-ui/lib/style.css'

// Vue.component(MessageBox.name, MessageBox);
Vue.prototype.$MessageBox = MessageBox
Vue.config.productionTip = false
Vue.prototype.$Host = 'http://106.14.144.162'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
