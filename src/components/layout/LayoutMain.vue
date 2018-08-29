<template>
  <div class="layout-box">
    <navbar>
      <breadcrumb slot="breadcrumb" :breadcrumb="breadcrumb"></breadcrumb>
      <template slot="navbar-btn-area">
        <div class="btn-clear-cache" @click="clearCache"><i class="fa  fa-refresh"></i>&nbsp;清除缓存</div>
        <dropdown-menu class="navbar-dropdown">
          <template slot="toggle">
            <i class="fa  fa-user"></i>&nbsp;{{nickname}}&nbsp;<i class="fa fa-angle-down"></i>
          </template>
          <template slot="menu">
            <router-link to="/site/update-pwd"><i class="fa fa-lock"></i>&nbsp;修改密码</router-link>
            <a href="javascript:" @click="logout"><i class="fa fa-sign-out"></i>&nbsp;退出登录</a>
          </template>
        </dropdown-menu>
      </template>

    </navbar>
    <cms-menu :menus="menus" :project-name="project_name"></cms-menu>
    <div class="layout-main">
      <div class="layout-main-inner">
        <slot></slot>
      </div>
    </div>

    <toast ref="toast"></toast>
  </div>
</template>

<script>

  import Breadcrumb from '../mod/Breadcrumb'
  import CmsMenu from '../mod/Menu'
  import Navbar from '../mod/Navbar'
  import DropdownMenu from '../mod/DropdownMenu'
  import Toast from "../mod/Toast"

  import config from '../../utils/config/config'
  import api from '../../utils/config/api'
  import network from '../../utils/base/network'
  import authorize from '../../utils/base/authorize'

  export default {
    name: 'LayoutMain',
    components:{CmsMenu,Navbar,DropdownMenu,Breadcrumb,Toast},
    data:function () {
      return {
        project_name:config.project_name,
      }
    },
    computed:{
      menus:function () {
        return this.$store.state.menu
      },
      breadcrumb:function () {
        return this.$store.state.breadcrumb
      },
      nickname:function () {
        return this.$store.state.nickname
      }

    },
    mounted:function(){

    },
    methods:{
      clearCache:function () {
        network.post(api.clear_cache).then(()=>{
          this.$toast({
            title:'缓存清除成功,请刷新页面'
          })
        })
      },
      logout:function () {
        network.post(api.logout).then(()=>{
          this.$router.push({path:config.login_path})
          authorize.clearToken()
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .layout-box{
    width: 100%;
    height: 100%;
    .nvabar{
      width: 100%;
      height: 60px;
      background-color: rebeccapurple;
    }
    .layout-main{
      width: 100%;
      padding-left: 210px;
      padding-top: 66px;
      .layout-main-inner{
        width: 100%;
        min-height: 800px;
        background-color: white;
        padding: 15px 15px 50px;
      }
    }


  }

  .btn-clear-cache{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    cursor: pointer;

    &:hover{
      background-color: #eee;
    }
  }
  .navbar-dropdown{
    .dropdown-toggle{
      &:hover{
        background-color: #eee !important;
      }
      .open&{
        background-color: #eee !important;
      }

    }
  }
</style>
