<template>
  <div>
    <p>首页内容</p>
  </div>
</template>

<script>

  import authorize from '../../utils/base/authorize'
  import api from '../../utils/config/api'
  import network from '../../utils/base/network'
  import {SET_BREADCRUMB} from "../../store/mutation-types";

  export default {
    name: 'Index',
    components: {},

    data:function () {
      return {


      }
    },
    mounted:function () {
      let breadcrumb=[
        {
          link: '/index',
          title:'首页哈哈'
        },
        {
          link:'/member/index',
          title:'用户管理哈哈'
        },
        {
          link:'/member/edit',
          title:'编辑用户'
        }
      ]
      this.$store.commit(SET_BREADCRUMB,breadcrumb)
    }
  }
</script>

<style lang="less" scoped>

</style>
