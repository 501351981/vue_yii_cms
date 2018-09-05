<template>
  <transition name="fade">
   <div class="confirm" v-show="isShow">
     <div class="confirm-content">
       <div class="title">{{confirm.title}}</div>
       <div class="content">{{confirm.content}}</div>
       <div class="btn-area">
         <div class="btn btn-primary" @click="onOk">{{confirm.confirmText}}</div>
         <div class="btn btn-default" v-if="confirm.showCancel" @click="onCancle">{{confirm.cancelText}}</div>
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
        confirm:{
          title:'提醒',
          content:'',
          confirmText:'确定',
          cancelText:'取消',
          showCancel:true,
          success:'',
          fail:''
        },
        isShow:false

      }
    },
    methods:{
      onOk:function () {
        if(typeof(this.confirm.success)=='function'){
          this.confirm.success()
        }
        this.isShow=false
      },
      onCancle:function () {
        if(typeof(this.confirm.fail)=='function'){
          this.confirm.fail()
        }
        this.isShow=false
      },
      show:function (opt) {
        this.confirm=opt
        this.isShow=true
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
      /*color: #999999;*/
      padding: 30px 20px;
    }
    .btn-area{
      width: 100%;
      height: 50px;
      line-height: 50px;
      border-top: 1px solid #eeeeee;
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
