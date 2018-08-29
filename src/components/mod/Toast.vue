<template>
  <div class="toast" :class="{show:isShow}">{{title}}</div>
</template>

<script>
  export default {
    name:'Toast',
    data:function () {
      return {
        title:'',
        isShow:false
      }
    },
    methods:{
      show:function (title,duration=2000) {
        this.title=title
        this.isShow=true
        setTimeout(()=>{
          this.isShow=false
        },duration)
      }
    }
  }
</script>

<style scoped lang="less">
    .toast{
      display: none;
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

      &.show{
        display: block;
      }
    }
</style>
