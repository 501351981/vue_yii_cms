<template>
  <div class="modal-pannel" v-if="isShow" @click="cancle">
    <div class="modal-main" :style="{width:width+'px'}" @click="(e)=>e.stopPropagation()">
      <div class="modal-c">
        <slot></slot>
      </div>
      <div class="btn-area">
        <button-box class="btn-primary btn-sm" @click="ok">{{confirmText}}</button-box>
        <button-box v-if="showCancel" class="btn-default btn-sm" @click="cancle">{{cancelText}}</button-box>
      </div>
    </div>
  </div>
</template>
<script>
  import ButtonBox from './ButtonBox'
  export default {
    name:'Modal',
    components: {ButtonBox},
    props:{
      width:{
        type:Number,
        default:300
      },
      confirmText:{
        type:String,
        default:"确定"
      },
      cancelText:{
        type:String,
        default:"取消"
      },
      showCancel:{
        type:Boolean,
        default:true
      }
    },
    data:function () {
      return {
        isShow:false
      }
    },

    methods:{
      show:function () {
        this.isShow=true
        document.body.className='noscroll'
      },
      hide:function(){
        this.isShow=false
        document.body.className=''
      },
      ok:function () {
        this.$emit('ok')
      },
      cancle:function () {
        this.$emit('cancle')
        this.hide()
      }
    }

  }

</script>
<style scoped lang="less">
  .modal-pannel{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.3);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;

    .modal-main{
      background-color: white;
      border-radius: 5px;
      .modal-c{
        padding: 10px 20px;
      }

      .btn-area{
        border-top: 1px solid #e5e5e5;
        padding: 5px 20px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .btn + .btn{
          margin-left: 10px;
        }
      }
    }
  }
</style>
