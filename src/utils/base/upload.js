import api from '../config/api'
import axios from 'axios'
import authorize from "./authorize";


function uploadfile(file,options={}) {
  let filename=file.name
  let filesize=file.size
  let type=filename.substr(filename.indexOf('.')+1).toLowerCase();

  if(options.extensions){
    let extensions=options.extensions.split(',')
    if(extensions.indexOf(type)==-1){
      options.fail&&options.fail("文件类型错误，文件后缀必须是"+options.extensions)
      return false
    }
  }

  if(options.sizeLimit){
    if(filesize>options.sizeLimit){
      options.fail&&options.fail("文件太大了")
      return false
    }
  }

  let formdata=new FormData();
  formdata.append('file',file);

  let url=''

  if(options.token){
    formdata.append('token',token)
    url=api.upload_client
  }else {
    url=api.upload_server
  }


  axios.request({
    url: api.baseUrl+url,
    method:'post',
    params:{
      access_token:authorize.getToken()
    },
    data:formdata,
    headers:{
      'Content-Type':'multipart/form-data'
    },
  }).then((res)=>{
    let data=res.data

    if(options.token){
      options.success&&options.success(data['host']+data['key'])
      return true
    }else {
      if(data.code=='1'){
        options.success&&options.success(data.data.filename)
        return true
      }else {
        options.fail&&options.fail(data.msg)
        return false
      }
    }

  }).catch((err)=>{
    options.fail&&options.fail(err)
    return false
  })


}

export const upload=uploadfile
