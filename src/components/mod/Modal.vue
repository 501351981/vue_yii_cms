<template>
  <div class="modal-pannel" v-if="isShow">
    <div class="modal-main" :style="{width:width+'px'}">
      <div class="modal-c">
        <slot></slot>
      </div>
      <div class="btn-area">
        <button-box class="btn-primary btn-sm" @click="ok">确定</button-box>
        <button-box class="btn-default btn-sm" @click="cancle">取消</button-box>
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
