<template>
  <div class="label-radio">
    <label v-for="option in options" @click="change(option.value)" class="btn btn-default"  :class="{active:option.value==value}">{{option.title}}</label>
  </div>
</template>

<script>
  export default {
    name:'LableRadio',
    props:{
      value:[String,Number],
      options:Array
    },
    methods:{
      change(val){
        if(this.value!=val){
          this.$emit('input',val)
          this.$emit('change',val)
        }

      }
    }
  }

</script>

<style scoped lang="less">
  .label-radio{
    label{
      border-radius: 0;
      margin-right: -1px;

      &:first-child{
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      &:last-child{
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
      &.active{
        background-color: #e6e6e6;
        border-color: #adadad;
      }
    }
  }
</style>
