<template>
  <div class="fix-btn-area">
    <div class="btn-area">
      <button-box class="btn-primary" @click="formSubmit"  :loading-title="loadingTitle" ref="buttonBox">{{title}}</button-box>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import ButtonBox from  '../../components/mod/ButtonBox'
  export default {
    name:'FormSubmit',
    components:{ButtonBox},
    props:{
      title:{
        type:String,
        default:'保存'
      },
      loadingTitle:{
        type:String,
        default:'处理中...'
      }
    },
    methods:{
      formSubmit:function () {
        this.$emit('formSubmit')
      },
      showLoading:function () {
        this.$refs.buttonBox.showLoading()
      },
      hideLoading:function () {
        this.$refs.buttonBox.hideLoading()
      },
    }
  }
</script>

<style scoped lang="less">
  .fix-btn-area{
    position: fixed;
    z-index: 1000;
    left: 0;
    bottom: 0;
    width: 100%;
    padding-left: 210px;
    .btn-area{
      padding-left: 100px;
      height: 50px;
      background-color: #EEE;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .btn{
        border-radius: 0;
        padding: 6px 20px;
      }
    }
  }
</style>
