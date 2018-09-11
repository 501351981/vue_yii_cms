<template>
  <div>
    <p id="test2">首页内容</p>
    <table-box></table-box>
  </div>
</template>

<script>


  import {SET_BREADCRUMB} from "../../store/mutation-types";

  export default {
    name: 'Index',
    components: {},

    data:function () {
      return {

      }
    },


    methods:{

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

      console.log(this.$api.member_index)

    }
  }
</script>

<style lang="less" scoped>

</style>
