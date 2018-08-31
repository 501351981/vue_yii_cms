<template>
  <div>
    <form class="form-horizontal form-edit">
      <input type="hidden" v-model="form.data.id"/>


      <div class="form-group">
        <label class="col-xs-2 control-label"><span class="required">*</span>名称：</label>
        <div class="col-xs-8">
          <input class="form-control form-field" v-model="form.data.name"/>
        </div>
      </div>



      <div class="form-group">
        <label class="col-xs-2 control-label"><span class="required">*</span>内容：</label>
        <div class="col-xs-8">
          <textarea class="form-control form-field" rows="20" v-model="form.data.content"></textarea>
        </div>
      </div>



      <form-submit @formSubmit="formSubmit"></form-submit>
    </form>
  </div>
</template>

<script>
  import FormSubmit from "../../components/mod/FormSubmit"

  import formValidation from '../../utils/base/formValidation'
  import api from '../../utils/config/api'
  import network from '../../utils/base/network'


  export default {
    name: 'DemoEdit',
    components: {FormSubmit},

    data:function () {
      return {
        form:{
          data:{
            id:'',
            name:'',
            content:'',
          },
          rules:{
            name:{
              required:true
            },
            content:{
              required:true
            },
          },
          message:{
            name:{
              required:"名称不能为空"
            },
            content:{
              required:"内容不能为空"
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
          link:'/demo/index',
          title:'demo管理'
        },
        {
          link:'',
          title:'编辑demo'
        },

      ]
      this.$store.commit('SET_BREADCRUMB',breadcrumb)

      let id=this.$route.query.id
      this.form.data.id=id
      if(id){
        network.post(api.demo_detail,{
          id:id,
        }).then((res)=>{
          this.form.data=res.detail
        })
      }

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

        network.post(api.demo_save,{
          ...form_data

        }).then((res)=>{
          this.$toast({
            title:"保存成功"
          })
          this.$router.push('/demo/index')
        })
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
