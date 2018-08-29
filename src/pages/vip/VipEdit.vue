<template>
  <div>
    <p>VIP的编辑页面</p>
  </div>
</template>

<script>

  import authorize from '../../utils/base/authorize'


  import api from '../../utils/config/api'
  import network from '../../utils/base/network'
  import {SET_BREADCRUMB} from "../../store/mutation-types";

  export default {
    name: 'VipEdit',
    components: {},

    data:function () {
      return {

      }
    },
    mounted:function () {
      let breadcrumb=[
        {
          link: '/index',
          title:'首页'
        },
        {
          link:'/member/index',
          title:'用户管理'
        },
        {
          link:'',
          title:'编辑用户'
        }

      ]
      this.$store.commit(SET_BREADCRUMB,breadcrumb)
    }
  }
</script>

<style lang="less" scoped>

</style>
