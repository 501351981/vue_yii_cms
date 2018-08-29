<template>
  <button class="btn" :disabled="isDisable||loading" :class="[type?defaultClass[type]:'']" @click.prevent="btnClick">
    <template v-if="!loading">
      <template v-if="type=='add'">
        <i class="fa fa-plus"></i> {{title?title:'添加'}}
      </template>

      <template v-else-if="type=='edit'">
        <i class="fa fa-pencil-square-o"></i> {{title?title:'编辑'}}
      </template>

      <template v-else-if="type=='delete'">
        <i class="fa fa-trash-o"></i> {{title?title:'删除'}}
      </template>

      <template v-else-if="type=='online'">
        <i class="fa fa-arrow-up"></i> {{title?title:'上线'}}
      </template>

      <template v-else-if="type=='offline'">
        <i class="fa fa-arrow-down"></i> {{title?title:'下线'}}
      </template>

      <template v-else-if="type=='recommend'">
        <i class="fa fa-hand-o-up "></i> {{title?title:'推荐'}}
      </template>

      <template v-else-if="type=='cancleRecommend'">
        <i class="fa fa-hand-o-down "></i> {{title?title:'取消推荐'}}
      </template>

      <template v-else-if="type=='pass'">
        <i class="fa fa-check  "></i> {{title?title:'通过'}}
      </template>

      <template v-else-if="type=='reject'">
        <i class="fa fa-times "></i> {{title?title:'拒绝'}}
      </template>

      <template v-else-if="type=='search'">
        <i class="fa fa-search "></i> {{title?title:'搜索'}}
      </template>

      <template v-else>
        {{title}}
      </template>


      <slot></slot>
    </template>

    <template v-else>{{loadingTitle}}</template>

  </button>
</template>
<script>
  export default {
    name:'ButtonBox',
    props:{
      type:{
        type:String,
        default:'default'
      },
      title:'',
      to:'',
      loadingTitle:{
        type:String,
        default:'处理中...'
      },
    },
    data:function(){
      return {
        isDisable:false,
        defaultClass:{
          default:'',
          add:'btn-primary',
          edit:'btn-info',
          delete:'btn-danger',
          online:'btn-warning',
          offline:'btn-default',
          recommend:'btn-info',
          cancleRecommend:'btn-default',
          pass:'btn-primary',
          reject:'btn-warning',
          search:'btn-default',
        },
        loading:false
      }
    },
    methods:{
      btnClick:function () {
        this.isDisable=true
        if(this.to){
          this.$router.push(this.to)
        }else{
          this.$emit('click')
        }

        setTimeout(()=>{
          this.isDisable=false
        },500)
      },
      showLoading:function () {
        this.loading=true
      },
      hideLoading:function () {
        this.loading=false
      }
    }

  }
</script>
