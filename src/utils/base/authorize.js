//关于授权登录等基础方法
import config from '../config/config'
/*
* 保存登录信息至本地缓存
*/
function saveToken(token,expires) {
  localStorage.token=JSON.stringify({
    token:token,
    expires: expires*1000
  })
}

function getToken() {
  if(localStorage.token){
    let token=JSON.parse(localStorage.token)

    if(token.expires < Date.parse(new Date())){
      return false
    }

    return token.token
  }else{
    return false
  }
}

function clearToken() {
  localStorage.removeItem("token")
}

function checkLogin() {
  if(getToken()){
    return true
  }else{
    return false
  }
}

function saveAccount(username,password) {
  localStorage.setItem('account',JSON.stringify({
    username:username,
    password: password
  }))
}

function getAccount() {
  if(localStorage.account){
    return JSON.parse(localStorage.account)
  }else {
    return false
  }
}

function clearAccount() {
  localStorage.removeItem("account")
}

export default {
  saveToken,
  getToken,
  clearToken,
  checkLogin,
  saveAccount,
  getAccount,
  clearAccount
}
