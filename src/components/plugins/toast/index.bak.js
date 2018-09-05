import vue from 'vue'
import toastComponent from './toast.vue'

const ToastConstructor = vue.extend(toastComponent)

function showToast(options) {

  let opt={
    title:'',
    icon:'none',
    duration:2000,
    type:''
  }

  Object.assign(opt,options)
  // 实例化一个 toast.vue
  const toastDom = new ToastConstructor({
    el: document.createElement('div'),
    data() {
      return {
        title: opt.title,
        isShow: true,
        type:opt.type
      }
    }
  })

  document.body.appendChild(toastDom.$el)

  // 过了 duration 时间后隐藏
  setTimeout(() => {toastDom.isShow = false} ,opt.duration)
}


function registryToast() {
  // 将组件注册到 vue 的 原型链里去,
  // 这样就可以在所有 vue 的实例里面使用 this.$toast()
  vue.prototype.$toast = showToast
}

export default registryToast
