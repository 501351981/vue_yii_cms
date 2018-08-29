<template>
  <div>
    <form class="form-horizontal form-edit">
      <input type="hidden" v-model="form.data.id"/>
      <div class="form-group">
        <label class="col-xs-2 control-label"><span class="required">*</span>账号：</label>
        <div class="col-xs-6">
          <input class="form-control form-field" placeholder="登录账号" v-model="form.data.username"/>
        </div>
      </div>

      <div class="form-group">
        <label class="col-xs-2 control-label"><span class="required">*</span> 角色：</label>
        <div class="col-xs-6">
          <select class="form-control form-field" v-model="form.data.role">
            <option v-for="role in roles" :value="role.name">{{role.description}}</option>
          </select>
        </div>
      </div>

      <div class="form-group" v-if="!form.data.id">
        <label class="col-xs-2 control-label"><span class="required">*</span>密码：</label>
        <div class="col-xs-6">
          <input class="form-control form-field" v-model="form.data.password"/>
        </div>
      </div>

      <div class="form-group">
        <label class="col-xs-2 control-label"><span class="required">*</span> 真实姓名：</label>
        <div class="col-xs-6">
          <input class="form-control form-field" v-model="form.data.realname"/>
        </div>
      </div>

      <div class="form-group">
        <label class="col-xs-2 control-label"><span class="required">*</span>手机号：</label>
        <div class="col-xs-6">
          <input class="form-control form-field" v-model="form.data.mobile"/>
        </div>
      </div>

      <div class="form-group">
        <label class="col-xs-2 control-label"><span class="required">*</span>邮箱：</label>
        <div class="col-xs-6">
          <input class="form-control form-field" v-model="form.data.email"/>
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
        roles:[],
        form:{
          data:{
            id:'',
            username:'',
            role:'',
            password:'',
            realname:'',
            mobile:'',
            email:'',
          },
          rules:{
            username:{
              required:true,
              maxlengt:30
            },
            role:{
              required:true,
            },
            password:{
              required:true,
            },
            realname:{
              required:true,
            },
            mobile:{
              required:true,
              mobile:true
            },
            email:{
              required:true,
              email:true
            },
          },
          message:{
            username:{
              required:"账号不能为空",
              maxlength:"账号最多可输入30个字符"
            },
            role:{
              required:"角色不能为空",
            },
            password:{
              required:"密码不能为空",
            },
            realname:{
              required:"真实姓名不能为空",
            },
            email:{
              required:"邮箱不能为空",
            },
            mobile:{
              required:"手机号不能为空",
              mobile:"手机号格式不正确",
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
          title:'编辑管理员'
        },

      ]
      this.$store.commit('SET_BREADCRUMB',breadcrumb)

      let id=this.$route.query.id
      this.form.data.id=id
      network.post(api.user_detail,{
        id:id
      }).then((res)=>{
        console.log(res)
        if(id){
          this.form.data=res.detail
        }

        this.roles=res.roles

      })
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
        network.post(api.user_save,{
          ...form_data
        }).then((res)=>{
          this.$toast({
            title:"保存成功"
          })
          this.$router.push('/administrators/index')
        }).catch(err=>{
          this.$toast({
            title:err
          })
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
