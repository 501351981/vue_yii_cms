import authorize from './authorize'
import api from '../config/api'
import config from '../config/config'
import axios from 'axios'
import Qs from 'qs'
import router from '../../router'


function toLogin(redirect={go: -1}) {
  router.push({
    path: config.login_path,
    query:redirect
  })
}

function toForbidden() {
  router.push({
    path: config.forbidden_path
  })
}
/*
* check_login，请求数据之前，是否需要检查登录状态，如果登录已过期，则需要重新登录，然后再请求数据
*/
function get(url,data,check_login=false) {
  if(check_login&&!authorize.checkLogin()){
    //如果需要登录，且登录已经过期，则先进行登录，然后再进行数据处理
    return new Promise((resolve,reject)=>{
      toLogin()
      reject("登录过期，请先登录")
    })
  }

  return request(url,data,'get')
}

function post(url,data,check_login=false) {
  if(check_login&&!authorize.checkLogin()){
    //如果需要登录，且登录已经过期，则先进行登录，然后再进行数据处理
   return new Promise((resolve,reject)=>{
     toLogin()
     reject("登录过期，请先登录")
   })
  }

  return request(url,data,'post')
}

function request(url,data,method='get') {
  let params= method=='get'?data:'';
  let post_data= method=='post'?data:'';

  return new Promise((resolve,reject)=>{
    axios.request({
      url: api.baseUrl+url,
      method:method,
      params:{
        ...params,
        access_token:authorize.getToken()
      },
      data:post_data,

      transformRequest: [function (data) {
        return Qs.stringify(data);//把数据转化为QueryString
      }],

      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      },
      onUploadProgress:'',
      onDownloadProgress:''
    }).then((res)=>{
      res=res.data
      if(res.code=='1'){
        resolve(res.data)
      }else if(res.code=='401'){
        toLogin()
        reject("登录过期，请先登录")
      }else if(res.code=='403'){
        toForbidden()
        reject("缺少权限")
      }else if(res.code=='99'){
        reject(res.msg)
      }else {
        reject("未知code")
      }

    }).catch((err)=>{
      reject(err)
    })
  })

}

export default {
  get,post,toLogin
}
