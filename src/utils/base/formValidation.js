import {isArray,isObject,isString} from "./helper";

const message={
  required:"请输入必填字段",
  maxlength:"您最多可输入{0}个字符.",
  minlength:"您最少可输入{0}个字符.",
  mobile:"请输入正确的手机号",
  email:"请输入正确的邮箱",
  number:'请输入正确的数字',
  min:'最小值不能小于{0}',
  max:'最大值不能超过{0}',
}

const check={
  required:function(data){

    if(data==null){
      return false
    }

    if(parseFloat(data).toString() != "NaN"){
      return true
    }

    if((typeof data)=='object'){
      if(data.length>0){
        return true
      }else{
        return false
      }
    }

    data=data.replace(/\s+/g,"")

    if(data!=''&&data!=null&&data!=undefined){
      return true
    }

    return false
  },
  maxlength:function(data,len){
    if(data.length<=len){
      return true
    }
    return false
  },
  minlength:function(data,len){
    if(data.length>=len){
      return true
    }
    return false
  },
  mobile:function(data){
    let mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    return mobile.test(data)
  },
  email:function (data) {
    let email=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    return email.test(data)
  },
  number:function (data) {
    let number=/^[0-9]+(.[0-9]+)?$/
    return number.test(data)
  },
  min:function (data,number) {
    if(data>=number){
      return true
    }

    return false
  },
  max:function (data,number) {
    if(data<=number){
      return true
    }

    return false
  },
}

function validate(rules,data,msg={}) {
  for (let key in rules){
    let rule = rules[key]
    //判断是否有前置条件
    if(rule.hasOwnProperty('dependencies')){
      let params=[]
      if(rule.dependencies.hasOwnProperty('property')){
        if(isArray(rule.dependencies.property)){
          let properties=rule.dependencies.property;
          for(let i=0;i<properties.length;i++){
            params.push(data.hasOwnProperty(properties[i])?data[properties[i]]:'')
          }
        }else {
          params.push(data.hasOwnProperty(rule.dependencies.property)?data[rule.dependencies.property]:'')
        }
      }
      if(typeof rule.dependencies.condition=='function' && !rule.dependencies.condition(...params)){
        continue
      }
    }

    for(let type in rule){
      switch (type){
        case 'required':

          if(rule[type]&&(!(data[key]===undefined))&&!check.required(data[key])){
            let err=(msg&&msg[key]&&msg[key][type])||message[type]
            return fail(err)
          }
          break;

        case 'maxlength':
          if (data[key]!=undefined&&!check.maxlength(data[key], rule[type])) {
            let err=(msg&&msg[key]&&msg[key][type]) ||  message[type].replace('{0}',rule[type])
            return fail(err)
          }
          break;

        case 'minlength':
          if (data[key]!=undefined&&!check.minlength(data[key], rule[type])) {
            let err=(msg&&msg[key]&&msg[key][type]) ||  message[type].replace('{0}',rule[type])
            return fail(err)
          }
          break;

        case 'mobile':
          if(rule[type]&&(data[key]!=undefined)&&!check.mobile(data[key])){
            let err=(msg&&msg[key]&&msg[key][type]) || message[type]
            return fail(err)
          }
          break;

        case 'email':
          if(rule[type]&&(data[key]!=undefined)&&!check.email(data[key])){
            let err=(msg&&msg[key]&&msg[key][type]) || message[type]
            return fail(err)
          }
          break;

        case 'number':
          if(rule[type]&&(data[key]!=undefined)&&!check.number(data[key])){
            let err=(msg&&msg[key]&&msg[key][type]) || message[type]
            return fail(err)
          }
          break;

        case 'max':
          if (data[key]!=undefined&&!check.max(data[key], rule[type])) {
            let err=(msg&&msg[key]&&msg[key][type]) ||  message[type].replace('{0}',rule[type])
            return fail(err)
          }
          break;

        case 'min':
          if (data[key]!=undefined&&!check.min(data[key], rule[type])) {
            let err=(msg&&msg[key]&&msg[key][type]) ||  message[type].replace('{0}',rule[type])
            return fail(err)
          }
          break;

        default:{
          break;
        }
      }

    }
  }

  return success()

}
function success() {
  return {
    code:'SUCCESS',
    msg:'验证通过'
  }
}

function fail(err) {
  return {
    code:'FAIL',
    msg:err
  }
}

export default {validate,check}
