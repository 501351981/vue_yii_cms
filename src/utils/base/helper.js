/*
*js常用功能小助手
*/

function phpTimeToJsTime(timestamp) {
  if(!timestamp){
    return ''
  }
  let time=new Date(parseInt(timestamp)*1000)
  let y = time.getFullYear();
  let m = time.getMonth()+1;
  let d = time.getDate();
  let h = time.getHours();
  let mm = time.getMinutes();
  let s = time.getSeconds();
  function add0(m){return m<10?'0'+m:m }
  return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}

function phpTimeToJsDate(timestamp) {
  if(!timestamp){
    return ''
  }
  let time=new Date(parseInt(timestamp)*1000)
  let y = time.getFullYear();
  let m = time.getMonth()+1;
  let d = time.getDate();
  function add0(m){return m<10?'0'+m:m }
  return y+'-'+add0(m)+'-'+add0(d)
}

function randomString(len) {
  len = len || 32
  let chars = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let maxPos = chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

function getNowFormatDate() {
  let date = new Date();
  let seperator1 = "-";
  let seperator2 = ":";
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + date.getHours() + seperator2 + date.getMinutes()
    + seperator2 + date.getSeconds();
  return currentdate;
}

export const isArray=function(obj) {
  let array=[]
  return Object.prototype.toString.call(obj)==Object.prototype.toString.call(array)
}

export const isObject=function(obj) {
  let object={}
  return Object.prototype.toString.call(obj)==Object.prototype.toString.call(object)
}

export const isString=function(str) {
  let string='a'
  return Object.prototype.toString.call(str)==Object.prototype.toString.call(string)
}



export default {phpTimeToJsTime,phpTimeToJsDate,randomString,getNowFormatDate,isArray,isObject,isString}
