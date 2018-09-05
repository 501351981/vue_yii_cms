<template>
  <transition name="fade">
    <div class="toast" v-show="isShow" :class="type">{{title}}</div>
  </transition>

</template>

<script>
  export default {
    name:'Toast',
    data:function () {
      return {
        title:'',
        type:'',
        isShow:false

      }
    },
    methods:{
      show:function (title,type) {
        this.title=title
        this.type=type
        this.isShow=true
      },
      hide:function () {
        this.isShow=false
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../less/variable";
    .toast{
      display: block;
      height: 40px;
      line-height: 40px;
      padding:0 20px;
      background: rgba(76,76,76,1);
      position: absolute;
      left: 50%;
      top:50%;
      transform: translate(-50%,-50%);
      z-index: 9999;
      border-radius: 10px;
      color: white;
      font-size: 14px;
      text-align: center;
      &.error{
        background-color: red;
      }
      &.success{
        background-color: @brand-color;
      }
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
</style>
