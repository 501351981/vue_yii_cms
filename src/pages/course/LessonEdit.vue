<template>
  <div>
    <form class="form-horizontal form-edit">
      <input type="hidden" v-model="form.data.id"/>


      <div class="form-group">
        <label class="col-xs-2 control-label"><span class="required">*</span>标题：</label>
        <div class="col-xs-8">
          <input class="form-control form-field" v-model="form.data.name"/>
        </div>
      </div>

      <div class="form-group">
        <label class="col-xs-2 control-label"><span class="required">*</span>父级菜单：</label>
        <div class="col-xs-8">
          <select class="form-control form-field" v-model="form.data.pid" >
            <option value="0">顶级菜单</option>
            <option v-for="p in pids" :value="p.id">{{p.name}}</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="col-xs-2 control-label"><span class="required">*</span>排序值：</label>
        <div class="col-xs-8">
          <input class="form-control form-field" v-model="form.data.sort"/>
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
        <label class="col-xs-2 control-label">关键词：</label>
        <div class="col-xs-8">
          <input class="form-control form-field" v-model="form.data.seo_words"/>
        </div>
      </div>

      <form-submit @formSubmit="formSubmit"></form-submit>
    </form>
  </div>
</template>

<script>
  import FormSubmit from "../../components/mod/FormSubmit"
  import Ueditor from "../../components/mod/Ueditor"

  import formValidation from '../../utils/base/formValidation'


  export default {
    name: 'RolesEdit',
    components: {FormSubmit,Ueditor},

    data:function () {
      return {
        pids:[],
        cid:'',
        cname:'',
        form:{
          data:{
            id:'',
            name:'',
            pid:0,
            sort:0,
            content:'',
            desc:'',
            seo_words:'',
          },
          rules:{
            name:{
              required:true
            },
            content:{
              required:true
            },
            sort:{
              required:true
            },
          },
          message:{
            name:{
              required:"标题不能为空"
            },
            content:{
              required:"内容不能为空"
            },
            sort:{
              required:"排序值不能为空"
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
          link:'/course/index',
          title:'教程管理'
        },
        {
          link:'/lesson/index?cid='+this.$route.query.cid+'&cname='+this.$route.query.cname,
          title:this.$route.query.cname
        },
        {
          link:'',
          title:'编辑课程'
        },

      ]
      this.$store.commit('SET_BREADCRUMB',breadcrumb)

      let id=this.$route.query.id
      this.form.data.id=id
      let cid=this.$route.query.cid
      this.cid=cid
      this.cname=this.$route.query.cname
      this.$network.post(this.$api.lesson_detail,{
        id:id,
        cid:cid
      }).then((res)=>{
        if(id){
          this.form.data=res.detail
        }
        this.pids=res.pids


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


        form_data.course_id=this.cid

        this.$network.post(this.$api.lesson_save,{
          ...form_data

        }).then((res)=>{
          this.$toast({
            title:"保存成功"
          })
          this.$router.go(-1)
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
