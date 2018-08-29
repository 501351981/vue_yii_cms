<template>
  <div class="fix-btn-area">
    <div class="btn-area">
      <ButtonBox class="btn-primary" @click="formSubmit">{{title}}</ButtonBox>
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
      }
    },
    methods:{
      formSubmit:function () {
        this.$emit('formSubmit')
      }
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
