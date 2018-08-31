<template>
  <div>
    <form class="form-horizontal form-edit">
      <input type="hidden" v-model="form.data.id"/>


      <div class="form-group">
        <label class="col-xs-2 control-label">名称：</label>
        <div class="col-xs-8">
          <input class="form-control form-field" v-model="form.data.name"/>
        </div>
      </div>


      <div class="form-group">
        <label class="col-xs-2 control-label">排序：</label>
        <div class="col-xs-8">
          <input class="form-control form-field" v-model="form.data.sort"/>
        </div>
      </div>



      <div class="form-group">
        <label class="col-xs-2 control-label">封面：</label>
        <div class="col-xs-8">
          <image-upload data-type="string" :num-limit="1" :size-limit="2*1024*1024" v-model="form.data.cover"></image-upload>
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
    name: 'CourseEdit',
    components: {ImageUpload, FormSubmit,Ueditor},

    data:function () {
      return {
        categories:[],
        authors:[],
        form:{
          data:{
            id:'',
            name:'',
            sort:0,
            cover:'',
          },
          rules:{
            name:{
              required:true
            },
            sort:{
              required:true
            },
            cover:{
              required:true
            },

          },
          message:{
            name:{
              required:"名称不能为空"
            },
            sort:{
              required:"排序不能为空"
            },
            cover:{
              required:"封面不能为空"
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
          link:'',
          title:'编辑教程'
        },

      ]
      this.$store.commit('SET_BREADCRUMB',breadcrumb)

      let id=this.$route.query.id
      this.form.data.id=id

      network.post(api.course_detail,{
        id:id
      }).then((res)=>{

        if(id){
          this.form.data=res.detail
        }

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


        network.post(api.course_save,{
          ...form_data

        }).then((res)=>{
          this.$toast({
            title:"保存成功"
          })
          this.$router.push('/course/index')
        })
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
