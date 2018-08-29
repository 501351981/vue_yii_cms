<template>
  <div>
    <form class="form-horizontal form-edit">

      <div class="form-group">
        <label class="col-xs-2 control-label"><span class="required">*</span>旧密码：</label>
        <div class="col-xs-6">
          <input class="form-control form-field" type="password" v-model="form.data.old_password"/>
        </div>
      </div>

      <div class="form-group">
        <label class="col-xs-2 control-label"><span class="required">*</span>新密码：</label>
        <div class="col-xs-6">
          <input class="form-control form-field" v-model="form.data.new_password"/>
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
            old_password:'',
            new_password:'',
          },
          rules:{
            old_password:{
              required:true
            },
            new_password:{
              required:true
            }
          },
          message:{
            old_password:{
              required:"旧密码不能为空"
            },
            new_password:{
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
          title:'个人资料'
        },
        {
          link:'',
          title:'修改密码'
        },

      ]
      this.$store.commit('SET_BREADCRUMB',breadcrumb)


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

        form_data.old_password=md5(form_data.old_password)
        form_data.new_password=md5(form_data.new_password)

        network.post(api.user_update_password,{
          ...form_data
        }).then((res)=>{
          this.$toast({
            title:"密码修改成功",
            type:'success'
          })
        }).catch((err)=>{
          this.$toast({
            title:err,
            type:'error'
          })
        })
      }
    }
  }
</script>

<style>

</style>
