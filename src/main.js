// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import dynamicRouter from './router/dynamic-router'
import store from './store/index'
import authorize from './utils/base/authorize'
import network from './utils/base/network'
import config from './utils/config/config'
import api from './utils/config/api'
import toastRegistry from './components/plugins/toast/index'
import confirmRegistry from './components/plugins/confirm/index'


//全局js引用
Vue.prototype.$api=api
Vue.prototype.$network=network


// 全局插件引用
Vue.use(toastRegistry)
Vue.use(confirmRegistry)


//导航守卫
router.beforeEach(async (to,from,next)=>{

  if(to.meta.requiresAuth===false){
    //不需要登录的直接放行
    next()
  }else if(!authorize.checkLogin()){
    //如果页面需要登录，且登录失效，进入登录页面
    next({
      path:config.login_path,
      query: { redirect: to.fullPath }
    })
  }else {
    //已经登录
    //是否已经拉取menu，权限等信息
    if(!store.state.menu_loaded){
      //如果页面还没有拉取menu
      await network.post(api.get_user_info,'',true).then((res)=>{
        store.commit('SET_USER_INFO',res)
        let dy_routers=dynamicRouter.generateRouteByPermision(dynamicRouter.routes,res.permission);
        router.addRoutes(dy_routers)

      })
      next({ ...to, replace: true })

    }else{
      next()
    }

  }

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
