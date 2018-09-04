<template>
<div class="login">
  <div class="header"></div>
  <form>
    <input name="username" v-model="form.username" type="text" placeholder="请输入后台账号"/>
    <input name="password" v-model="form.password" type="password" placeholder="密码"/>
    <div class="remember">
      <label><input type="checkbox" name="rememberme" v-model="form.rememberme" /> 记住密码</label>
    </div>

    <button-box class="button" title="登录" loading-title="登录中..." @click="login" ref="loginBtn"></button-box>
  </form>
  <div class="project-name">－{{project_name}}－</div>

</div>
</template>

<script>

  import ButtonBox from "../../components/mod/ButtonBox"

  import config from '../../utils/config/config'
  import api from '../../utils/config/api'
  import network from '../../utils/base/network'
  import authorize from "../../utils/base/authorize";
  import {md5} from "../../utils/lib/md5";


  import dynamicRouter from '../../router/dynamic-router'
  import router from "../../router/index";


  export default {
    name: "Login",
    components: {ButtonBox},
    data:function () {
      return {
        project_name:config.project_name,
        form:{
          username:'',
          password:'',
          rememberme:false
        }
      }
    },

    mounted:function(){
      let account=authorize.getAccount()
      if(account){
        this.form.username=account.username
        this.form.password=account.password
        this.form.rememberme=true
      }
    },
    methods:{
      login:function () {
        console.log(this.form)

        this.$refs.loginBtn.showLoading()

        //保存／清除账号
        if(this.form.rememberme){
          authorize.saveAccount(this.form.username,this.form.password)
        }else {
          authorize.clearAccount()
        }

        let post_data={
          username:this.form.username,
          password:md5(this.form.password)
        }

        network.post(api.login,post_data).then(res=>{

          //保存token
          authorize.saveToken(res.token,res.expires)

          //跳转
          if(typeof(this.$route.query.redirect)!="undefined"){
            this.$router.push(this.$route.query.redirect)
          }else if(typeof(this.$route.query.go)!="undefined"){
            this.$router.go(this.$route.query.go)
          }else {
            this.$router.push(config.index_path)
          }

          this.$refs.loginBtn.hideLoading()

        }).catch(err=>{
          console.log(err)
          this.$toast({
            title:err,
            type:'error'
          })

          this.$refs.loginBtn.hideLoading()
        })


      }
    }
  }
</script>


<style scoped lang="less">
  @import "../../less/variable";
  .login{
    width: 100%;
    height: 100%;
    .header{
      width: 100%;
      height: 140px;
      background-color: @brand-color;
    }

    form{
      width: 400px;
      padding: 54px 70px;
      border-radius: 10px;
      background-color: #fff;
      box-shadow: 0 2px 10px -3px rgba(0,0,0,.8);
      margin: 0 auto;
      position: relative;
      top: -94px;

      input[type="text"],input[type="password"]{
        width: 100%;
        background-color: #f4f4f4;
        color: #a8a8a8;
        border-color: transparent;
        box-shadow: none;
        line-height: 28px;
        height: 42px;
        padding: 6px 12px;
        font-size: 14px;
        border-radius: 0;
        margin: 10px 0;
      }

      .button{
        display: block;
        width: 100%;
        margin-top: 12px;
        padding: 0 !important;
        height: 38px;
        line-height: 38px;
        text-align: center;
        color: #fff;
        background-color: @brand-color;
        border-color: transparent;
      }
    }

    .project-name{
      font-size: 18px;
      text-align: center;
      color: #acabab;
      position: relative;
      top: -60px;
    }
  }

</style>
