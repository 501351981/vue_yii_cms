import * as type from './mutation-types.js'

export default {
  [type.SET_BREADCRUMB](state,breadcrumb){
    state.breadcrumb=breadcrumb
  },
  [type.SET_USER_INFO](state,userinfo){
    state.nickname=userinfo.nickname
    state.menu=userinfo.menu
    state.menu_loaded=true
  },
  [type.CLEAR_USER_INFO](state,userinfo){
    state.nickname=''
    state.menu=[]
    state.menu_loaded=false
  },
  [type.SET_ROUTER](state,router){
    state.router=router
  },


}
