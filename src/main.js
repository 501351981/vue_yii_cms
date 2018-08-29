// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import dynamicRouter from './router/dynamic-router'
import store from './store/index'
import authorize from './utils/base/authorize'
import netwrok from './utils/base/network'
import config from './utils/config/config'
import api from './utils/config/api'
import toastRegistry from './components/plugins/toast/index'
import confirmRegistry from './components/plugins/confirm/index'



// 这里也可以直接执行 toastRegistry()
Vue.use(toastRegistry)
Vue.use(confirmRegistry)


router.beforeEach(async (to,from,next)=>{

  if(to.path==config.login_path){
    //登录页面直接通过
    next()
  }else {
    if(to.meta.requiresAuth&&!authorize.checkLogin()){
      //如果页面需要登录，且登录失效，进入登录页面
      next({
        path:config.login_path,
        query: { redirect: to.fullPath }
      })
    }else {
      if(!store.state.menu_loaded){
        //如果页面还没有拉取menu
       await netwrok.post(api.get_user_info,'',true).then((res)=>{
          store.commit('SET_USER_INFO',res)
          let dy_routers=dynamicRouter.generateRouteByPermision(dynamicRouter.routes,res.permission);
          router.addRoutes(dy_routers)

        })
        next({ ...to, replace: true })
        return

      }else{
        next()
      }


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
