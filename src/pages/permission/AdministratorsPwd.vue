<template>
  <div>
    <form class="form-horizontal form-edit">

      <input type="hidden" v-model="form.data.id"/>
      <div class="form-group">
        <label class="col-xs-2 control-label"><span class="required">*</span>新密码：</label>
        <div class="col-xs-6">
          <input class="form-control form-field" v-model="form.data.password"/>
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
  import {md5} from "../../utils/lib/md5";


  export default {
    name: 'RolesEdit',
    components: {FormSubmit},

    data:function () {
      return {
        form:{
          data:{
            id:'',
            password:'',
          },
          rules:{
            password:{
              required:true
            }
          },
          message:{
            password:{
              required:"新密码不能为空"
            }
          }
        }


      }
    },
    mounted:function () {
      let breadcrumb=[
        {
          link: '#',
          title:'权限管理'
        },
        {
          link:'/administrators/index',
          title:'后台管理员'
        },
        {
          link:'',
          title:'重置密码'
        },

      ]
      this.$store.commit('SET_BREADCRUMB',breadcrumb)

      let id=this.$route.query.id
      this.form.data.id=id

      if(!id){
        this.$toast({
          title: "id不能为空"
        })

        this.$router.go(-1)
      }
    },
    methods:{
      formSubmit:function () {

        let form_data={...this.form.data}

        console.log(form_data)
        let validation=formValidation.validate(this.form.rules,form_data,this.form.message)
        if(validation.code=='FAIL'){
          this.$toast({
            title:validation.msg,
            type:'error'
          })
          return false
        }

        form_data.password=md5(form_data.password)

        network.post(api.user_reset_password,{
          ...form_data
        }).then((res)=>{
          this.$toast({
            title:"保存成功"
          })
          this.$router.push('/administrators/index')
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

