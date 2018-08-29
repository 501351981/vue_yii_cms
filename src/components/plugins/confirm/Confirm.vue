<template>
  <transition name="fade">
   <div class="confirm" v-show="isShow">
     <div class="confirm-content">
       <div class="title">{{title}}</div>
       <div class="content">{{content}}</div>
       <div class="btn-area">
         <div class="btn btn-primary " @click="confirm">{{confirmText}}</div>
         <div class="btn btn-default " v-if="showCancel" @click="cancle">{{cancelText}}</div>
       </div>
     </div>

   </div>
  </transition>

</template>
<script>
  export default {
    name:'Confirm',
    data:function () {
      return {
        title:'提醒',
        content:'',
        confirmText:'确定',
        cancelText:'取消',
        showCancel:true,
        isShow:true,
        success:'',
        fail:''
      }
    },
    methods:{
      confirm:function () {
        if(typeof(this.success)=='function'){
          this.success()
        }
        this.isShow=false
      },
      cancle:function () {
        if(typeof(this.fail)=='function'){
          this.fail()
        }
        this.isShow=false
      }
    }
  }

</script>

<style scoped lang="less">
  .confirm{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top:0;
    z-index: 9999;
    background-color: rgba(0,0,0,0.4);

    .confirm-content{
      width: 280px;
      box-sizing: border-box;
      background: white;
      position: absolute;
      left: 50%;
      top:50%;
      margin-left: -140px;
      margin-top: -80px;
      border-radius: 10px;
      text-align: center;
    }
    .title{
      font-size: 18px;
      color: black;
      padding-top: 25px;
    }
    .content{
      font-size: 15px;
      line-height: 18px;
      color: #999999;
      padding: 30px 20px;
    }
    .btn-area{
      width: 100%;
      height: 50px;
      line-height: 50px;
      border-top: 1px solid #d2d3d5;
      display: flex;
      justify-content: center;
      align-items: center;
      .btn{
        margin-left: 10px;
        margin-right: 10px;
        border-radius: 0;
      }

    }
  }
</style>
