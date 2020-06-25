import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main.vue'
import login from '@/components/Login.vue'
import china from '@/components/Pages/china.vue'
import china1 from '@/components/Pages/china-1.vue'
import wuhan from '@/components/Pages/wuhan.vue'
import brief from '@/components/Pages/brief.vue'

import data1 from '@/components/Echarts/data1.vue'
import data2 from '@/components/Echarts/data2.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta: {
        keepalive: false
      }
    },
    {
      path: '/main',
      name: 'main',
      component: main,
      meta: {
        keepalive: true
      }
    },
    {
      path: '/china',
      name: 'china',
      component: china,
      meta: {
        keepalive: true
      }
    },
    {
      path: '/china1',
      name: 'china1',
      component: china1,
      meta: {
        keepalive: true
      }
    },
    {
      path: '/wuhan',
      name: 'wuhan',
      component: wuhan,
      meta: {
        keepalive: true
      }
    },
    {
      path: '/brief',
      name: 'brief',
      component: brief,
      meta: {
        keepalive: true
      }
    },
    {
      path: '/data1',
      name: 'data1',
      component: data1
    },
    {
      path: '/data2',
      name: 'data2',
      component: data2
    }
  ]
})
