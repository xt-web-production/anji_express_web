import Vue from 'vue'
import Router from 'vue-router'
import mobile from '@/pages/mobile'
import showenter from '@/pages/showenter'
import ticket from '@/pages/ticket'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mobile',
      component: showenter
    },
    {
      path: '/mobile',
      name: 'mobile',
      component: mobile
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: ticket
    }
  ]
})
