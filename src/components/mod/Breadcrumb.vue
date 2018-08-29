<template>
  <ol class="breadcrumb">
    <li>当前位置:</li>
    <li v-for="item in breadcrumb" >
      <router-link :to="item.link" v-if="item.link">{{item.title}}</router-link>
      <router-link :to="item.link" v-else class="active">{{item.title}}</router-link>
    </li>
  </ol>
</template>

<script>
  export default {
    name:'Breadcrumb',
    props:{
      breadcrumb:Array
    }
  }
</script>
<style lang="less" scoped>
  .breadcrumb {
    width: 100%;
    height: 56px;
    line-height: 56px;
    font-size: 14px;
    color: #777;
    &>li{
      display: inline-block;
      list-style: none;
      position: relative;
      &+li{
        margin-right: 20px;

        &:after{
          content: '/';
          position: absolute;
          right: -12px;
          top: 0px;
          color: #ccc;
        }

        &:last-child:after{
          content: '';
        }
      }


      & > a{
        color: #4db6ac;
        text-decoration: none;
        &.active{
          color: #777;
        }
      }
    }
  }
</style>
