<template>
  <div class="dropdown-menu" :class="{open:isshow}">
    <div v-on:click="toggle" class="dropdown-toggle">
      <slot name="toggle" ></slot>
    </div>
    <div v-if="isshow" class="dropdown-menu-list" @click="hide">
      <slot name="menu" ></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name:'DropdownMenu',
    data:function(){
      return {
        isshow: false
      }
    },
    mounted:function(){

    },
    methods:{
      toggle:function (e) {
        this.isshow = ! this.isshow
      },
      show:function () {
        this.isshow =true
      },
      hide:function () {
        this.isshow =false
      }
    }
  }
</script>

<style scoped lang="less">
  .dropdown-menu{
    position: relative;
    .dropdown-toggle{
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
      cursor: pointer;

      &:hover{
        background-color: #eee;
      }
      .open&{
        background-color: #eee;
      }

    }

    .dropdown-menu-list{
      width: 150%;
      min-width: 150px;
      position: absolute;
      z-index: 10;
      top: 100%;
      right: 0;
      border-radius: 2px;
      box-shadow: 0 3px 10px rgba(0,0,0,.1);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      background-color: white;
      margin-top: 5px;

      a{
        display: block;
        height: 40px;
        line-height: 40px;
        padding: 3px 20px;
        color: #000;
        &:hover{
          background-color: #eee;
        }
      }

    }
  }
</style>
