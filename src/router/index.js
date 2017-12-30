import Vue from 'vue'
import Router from 'vue-router'
import mobile from '@/pages/mobile'
import control from '@/pages/control'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mobile',
      component: mobile
    },
    {
      path: '/control',
      name: 'control',
      component: control
    }
  ]
})
