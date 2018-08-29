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


export default {phpTimeToJsTime,phpTimeToJsDate,randomString}
