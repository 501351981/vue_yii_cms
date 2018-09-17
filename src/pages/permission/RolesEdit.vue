<template>
  <div>
    <form class="form-horizontal form-edit">
      <input type="hidden" v-model="form.data.id"/>
      <div class="form-group">
        <label class="col-xs-2 control-label"><span class="required">*</span>角色名称：</label>
        <div class="col-xs-6">
          <input class="form-control form-field" v-model="form.data.description"/>
        </div>
      </div>

      <div class="form-group">
        <label class="col-xs-2 control-label">角色描述：</label>
        <div class="col-xs-6">
          <textarea class="form-control form-field" rows="3" v-model="form.data.data"></textarea>
        </div>
      </div>

      <fieldset>
        <legend>功能权限</legend>
        <div class="permissions">
          <div class="form-group" v-for="(permission,pindex) in permissions">
            <label class="col-xs-2 control-label">{{permission.name}}：</label>
            <div class="col-xs-10 checkbox-area">
              <label v-for="(child,cindex) in permission.children"><input type="checkbox"  name="permission" :value="pindex+'_'+cindex" v-model="form.data.role_permissions"/>{{child.name}}</label>
            </div>
          </div>
        </div>
      </fieldset>

      <form-submit @formSubmit="formSubmit"></form-submit>
    </form>
  </div>
</template>

<script>
  import FormSubmit from "../../components/mod/FormSubmit"

  import formValidation from '../../utils/base/formValidation'
  export default {
    name: 'RolesEdit',
    components: {FormSubmit},

    data:function () {
      return {

        permissions:[],

        form:{
          data:{
            id:'',
            description:'',
            data:'',
            role_permissions:[]
          },
          rules:{
            description:{
              required:true
            },
            role_permissions:{
              required:true
            }
          },
          message:{
            description:{
              required:"角色名称不能为空"
            },
            role_permissions:{
              required:"权限不能为空"
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
          link:'/roles/index',
          title:'系统角色'
        },
        {
          link:'',
          title:'编辑角色'
        },

      ]
      this.$store.commit('SET_BREADCRUMB',breadcrumb)

      let id=this.$route.query.id
      this.form.data.id=id

      this.$network.post(this.$api.roles_detail,{
        id:id
      }).then((res)=>{
        console.log(res)
        if(id){
          this.form.data.description=res.role.description
          this.form.data.data=res.role.data
        }

        this.permissions=res.permissions

        for(let i=0;i<res.permissions.length;i++){
          let children=res.permissions[i].children
          for(let j=0;j<children.length;j++){
            if(res.my_permissions[children[j].actions[0]]){
              this.form.data.role_permissions.push(i+'_'+j)
            }
          }
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

        this.$network.post(this.$api.roles_save,{
          name:form_data.id,
          description:form_data.description,
          data:form_data.data,
          permissions:form_data.role_permissions.join(',')

        }).then((res)=>{
          this.$toast({
            title:"保存成功"
          })
          this.$router.push('/roles/index')
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
