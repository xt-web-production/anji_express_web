import Vue from 'vue'
import Router from 'vue-router'
import mobilewrapper from '@/pages/mobile'
import showenter from '@/pages/mobile/showenter'
import mobile from '@/pages/mobile/mobile'
import ticket from '@/pages/mobile/ticket'
import control from '@/pages/control'
import bigscreen from '@/pages/bigscreen'
import bigscreenTicket from '@/pages/bigscreen/bigscreenTicket'
import subitem1 from '@/pages/bigscreen/subitem1'
import subitem2 from '@/pages/bigscreen/subitem2'
import subitem3 from '@/pages/bigscreen/subitem3'

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
    },
    {
      path: '/bigscreenTicket',
      name: 'bigscreenTicket',
      component: bigscreenTicket,
      children: [
        {
          path: 'subitem1',
          name: 'subitem1',
          component: subitem1
        },
        {
          path: 'subitem2',
          name: 'subitem2',
          component: subitem2
        },
        {
          path: 'subitem3',
          name: 'subitem3',
          component: subitem3
        }
      ]
    }
  ]
})
