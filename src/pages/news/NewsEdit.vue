<template>
  <div>
    <form class="form-horizontal form-edit">
      <input type="hidden" v-model="form.data.id"/>
      <div class="form-group">
        <div class="col-xs-4">
          <div class="form-group">
            <label class="col-xs-6 control-label"><span class="required">*</span>分类：</label>
            <div class="col-xs-6">
              <select class="form-control form-field" v-model="form.data.category_id1" ref="category">
                <option value="">请选择文章分类</option>
                <option v-for="category in categories" :value="category.id">{{category.title}}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="col-xs-4">
          <div class="form-group">
            <label class="col-xs-6 control-label"><span class="required">*</span>来源：</label>
            <div class="col-xs-6">
              <label class="control-label"><input type="radio" value="0" v-model="form.data.source"/> 原创 </label>
              <label class="control-label ml5"><input type="radio" value="1" v-model="form.data.source"/> 转载 </label>
            </div>
          </div>
        </div>

      </div>

      <div class="form-group">
        <label class="col-xs-2 control-label">标题：</label>
        <div class="col-xs-8">
          <input class="form-control form-field" v-model="form.data.title"/>
        </div>
      </div>



      <div class="form-group">
        <label class="col-xs-2 control-label">正文：</label>
        <div class="col-xs-8">
          <ueditor v-model="form.data.content"></ueditor>
        </div>
      </div>

      <div class="form-group">
        <label class="col-xs-2 control-label">摘要：</label>
        <div class="col-xs-8">
          <textarea class="form-control form-field" rows="3" v-model="form.data.desc"></textarea>
        </div>
      </div>

      <div class="form-group">
        <label class="col-xs-2 control-label">封面：</label>
        <div class="col-xs-8">
          <image-upload data-type="string" :num-limit="1" :size-limit="2*1024*1024" v-model="form.data.playbill"></image-upload>
        </div>
      </div>

      <div class="form-group">
        <label class="col-xs-2 control-label">关键词：</label>
        <div class="col-xs-8">
          <input class="form-control form-field" v-model="form.data.seo_words"/>
        </div>
      </div>

      <div class="form-group">
        <label class="col-xs-2 control-label"><span class="required">*</span>作者：</label>
        <div class="col-xs-8">
          <select class="form-control form-field" v-model="form.data.author">
            <option value="">请选择作者</option>
            <option v-for="author in authors" :value="author.id">{{author.realname}}</option>
          </select>
        </div>
      </div>


      <form-submit @formSubmit="formSubmit"></form-submit>
    </form>
  </div>
</template>

<script>
  import FormSubmit from "../../components/mod/FormSubmit"
  import Ueditor from "../../components/mod/Ueditor"
  import ImageUpload from "../../components/mod/ImageUpload"

  import formValidation from '../../utils/base/formValidation'
  import api from '../../utils/config/api'
  import network from '../../utils/base/network'


  export default {
    name: 'RolesEdit',
    components: {ImageUpload, FormSubmit,Ueditor},

    data:function () {
      return {
        categories:[],
        authors:[],
        form:{
          data:{
            id:'',
            category_id1:'',
            source:0,
            title:'',
            content:'',
            desc:'',
            playbill:'',
            seo_words:'',
            author:''
          },
          rules:{
            category_id1:{
              required:true
            },
            title:{
              required:true
            },
            content:{
              required:true
            },
            desc:{
              required:true
            },
            playbill:{
              required:true
            },
            seo_words:{
              required:true
            },
            author:{
              required:true
            },

          },
          message:{
            category_id1:{
              required:"分类不能为空"
            },
            title:{
              required:"标题不能为空"
            },
            content:{
              required:"内容不能为空"
            },
            desc:{
              required:"描述不能为空"
            },
            playbill:{
              required:"封面不能为空"
            },
            seo_words:{
              required:"关键词不能为空"
            },
            author:{
              required:"作者不能为空"
            },
          }
        }

      }
    },
    mounted:function () {
      let breadcrumb=[
        {
          link: '#',
          title:'内容管理'
        },
        {
          link:'/news/index',
          title:'文章管理'
        },
        {
          link:'',
          title:'编辑文章'
        },

      ]
      this.$store.commit('SET_BREADCRUMB',breadcrumb)

      let id=this.$route.query.id
      this.form.data.id=id

      network.post(api.news_detail,{
        id:id
      }).then((res)=>{
        console.log(res)
        if(id){
          this.form.data=res.detail
        }
        this.categories=res.categories
        this.authors=res.authors


      })
    },
    methods:{
      formSubmit:function () {
        let form_data={...this.form.data}

        let validation=formValidation.validate(this.form.rules,form_data,this.form.message)
        if(validation.code=='FAIL'){
          this.$toast({
            title:validation.msg,
            type:'error'
          })
          return false
        }

        let obj =this.$refs.category
        let index = obj.selectedIndex; // 选中索引
        let category_text = obj.options[index].text; // 选中文本
        form_data.category_text1=category_text

        network.post(api.news_save,{
          ...form_data

        }).then((res)=>{
          this.$toast({
            title:"保存成功"
          })
          this.$router.push('/news/index')
        })
      }
    }
  }
</script>

<style lang="less" scoped>

  .permissions{
    .checkbox-area{
      label{
        padding-left: 4px;
        margin-right: 10px;
        padding-top: 8px;
        min-height: 20px;
        margin-bottom: 0;
        font-weight: 400;
        input{
          margin-right: 4px;
        }

      }
    }

  }
</style>
