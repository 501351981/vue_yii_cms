function extend(to,from){
  //合并form对象和请求的detail数据，去除多余的属性
  for(let key in to){
    if(from.hasOwnProperty(key)){
      to[key]=from[key]
    }
  }

  return to
}

export  default {extend}
