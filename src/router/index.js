import Vue from 'vue'
import Router from 'vue-router'
import mobilewrapper from '@/pages/mobile'
import showenter from '@/pages/mobile/showenter'
import mobile from '@/pages/mobile/mobile'
import ticket from '@/pages/mobile/ticket'
import control from '@/pages/control'
import bigscreen from '@/pages/bigscreen'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mobilewrapper',
      component: mobilewrapper,
      children: [
        {
          path: '',
          name: 'showenter',
          component: showenter
        },
        {
          path: 'mobile',
          name: 'mobile',
          component: mobile
        },
        {
          path: 'ticket',
          name: 'ticket',
          component: ticket
        }
      ]
    },
    {
      path: '/control',
      name: 'control',
      component: control
    },
    {
      path: '/bigscreen',
      name: 'bigscreen',
      component: bigscreen
    }
  ]
})
