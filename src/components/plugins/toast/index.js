import vue from 'vue'
import toastComponent from './toast.vue'

let Toast={}

//插件必须有个install函数
Toast.install=function (vue) {

  //创建组件构造器
  let ToastConstructor = vue.extend(toastComponent)
  //实例化组件
  let toastDom=new ToastConstructor()
  //挂载之后，获取dom
  let tpl=toastDom.$mount().$el

  //定时器handle，再设定定时之前，清除原来的定时器
  let timeout=''

  //将组件插入页面
  document.body.appendChild(tpl)

  vue.prototype.$toast=function (options) {
    let opt={
      title:'',
      type:'',
      duration:2000
    }

    //合并参数
    Object.assign(opt,options)

    //显示toast
    toastDom.show(opt.title,opt.type)

    //定时隐藏toast
    clearTimeout(timeout)
    timeout=setTimeout(() => {toastDom.hide()} ,opt.duration)
  }
}

export default Toast
