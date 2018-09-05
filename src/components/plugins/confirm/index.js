import vue from 'vue'
import confirmComponent from './Confirm.vue'

var Confirm={}

Confirm.install=function (vue) {
  let ConfirmConstructor = vue.extend(confirmComponent)
  let ConfirmDom=new ConfirmConstructor()
  let tpl=ConfirmDom.$mount().$el

  document.body.appendChild(tpl)

  vue.prototype.$confirm=function (options) {
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

    ConfirmDom.show(opt)

  }

}

export default Confirm
