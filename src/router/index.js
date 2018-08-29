import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/site/Login'
import NoFind from '@/pages/site/404'
import Forbidden from '@/pages/site/403'



Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/site/login',
      name: 'login',
      component: Login
    },
    {
      path: '/404',
      name: '404',
      component:NoFind
    },
    {
      path: '/403',
      name: '403',
      component:Forbidden
    },


  ]
})


