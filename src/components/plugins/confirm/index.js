import vue from 'vue'
import confirmComponent from './Confirm.vue'

const ConfirmConstructor = vue.extend(confirmComponent)

function showConfirm(options) {

  let opt={
    title:'提醒',
    content:'',
    confirmText:'确定',
    cancelText:'取消',
    showCancel:true,
    success:'',
    fail:''
  }

  Object.assign(opt,options)
  // 实例化一个 toast.vue
  const confirmDom = new ConfirmConstructor({
    el: document.createElement('div'),
    data() {
      return {
        ...opt
      }
    }
  })

  document.body.appendChild(confirmDom.$el)

}


function registryConfirm() {
  // 将组件注册到 vue 的 原型链里去,
  // 这样就可以在所有 vue 的实例里面使用 this.$toast()
  vue.prototype.$confirm = showConfirm
}

export default registryConfirm
