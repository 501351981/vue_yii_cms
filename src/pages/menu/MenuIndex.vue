<template>
  <div>
    <div class="row h44">
      <div class="col-xs-6">

      </div>
      <div class="col-xs-6 flex-end-center">
        <button-box type="add"  @click="addItem" title="添加顶级菜单"></button-box>
        <button-box type="edit" @click="editItem"></button-box>
        <button-box type="delete" @click="deleteItem"></button-box>
      </div>
    </div>

    <table-box ref="tableBox" :url="table.url" :columns="table.columns" :key-name="table.keyName" :parse-data="table.parseData" :data="table.data" :multi-select="table.multiSelect">

        <tr slot="row"  slot-scope="props">
          <td class="tc">{{props.index}}</td>
          <td class="tc"><i :class="props.item.icon"></i></td>
          <td>{{props.item.name}}</td>
          <td class="tc">{{props.item.sort}}</td>
          <td>
            <button-box class="btn-info btn-sm" :to="'/menu/children?pid='+props.item.id+'&ptitle='+props.item.name">设置子菜单</button-box>
            <button-box class="btn-warning btn-sm" :to="'/menu/rights?pid='+props.item.id+'&ptitle='+props.item.name">设置子权限</button-box>
          </td>
        </tr>


    </table-box>

    <modal @ok="formSubmit" ref="modal">
      <form class="form-horizontal form-edit">

        <input type="hidden" v-model="form.data.id"/>
        <input type="hidden" v-model="form.data.type"/>
        <input type="hidden" v-model="form.data.pid"/>
        <div class="form-group">
          <div class="col-xs-12">
            <input class="form-control form-field" placeholder="类型名称" v-model="form.data.name"/>
          </div>
        </div>

        <div class="form-group">
          <div class="col-xs-12">
            <input class="form-control form-field" placeholder="排序值" v-model="form.data.sort"/>
          </div>
        </div>

        <div class="form-group">
          <div class="col-xs-12">
            <select class="form-control form-field" v-model="form.data.icon">
              <option value="">请选择图标</option>
              <option value="fa fa-user">用户</option>
              <option value="fa fa-exclamation-circle">权限</option>
              <option value="fa fa-book">书</option>
              <option value="fa fa-cogs">设置</option>
              <option value="fa fa-area-chart">图表</option>
              <option value="fa fa-bar-chart">图表2</option>
              <option value="fa fa-bell">铃铛</option>
              <option value="fa fa-building">建筑</option>
              <option value="fa fa-folder">文件夹</option>
              <option value="fa fa-home">首页</option>
              <option value="fa fa-file-text">文件</option>
              <option value="fa fa-film">视频</option>
              <option value="fa fa-database">数据库</option>
              <option value="fa fa-reorder">更多</option>
              <option value="fa fa-credit-card">卡片</option>
            </select>
          </div>
        </div>

      </form>
    </modal>
  </div>
</template>

<script>

  import api from '../../utils/config/api'
  import network from '../../utils/base/network'
  import formValidation from '../../utils/base/formValidation'

  import TableBox from '../../components/mod/TableBox'
  import ButtonBox from  '../../components/mod/ButtonBox'
  import Modal from '../../components/mod/Modal'
  import FormSubmit from "../../components/mod/FormSubmit"

  export default {
    name: 'MenuIndex',
    components: {TableBox,ButtonBox,Modal,FormSubmit},

    data:function () {
      return {
        table:{
          url:api.menu_index,
          multiSelect:false,
          keyName:'id',
          columns:[
            {
              title:"图标",
              field:"icon",
              width:'80'
            },
            {
              title:"名称",
              field:"name",
              width:''
            },
            {
              title:"排序值",
              field:"sort",
              width:'100'
            },
            {
              title:"操作",
              field:"caozuo",
              width:'200'
            },
          ],
          parseData:function (data) {
            data.forEach(function(row){

            })
          }
        },
        form:{
          data:{
            id:'',
            type:0,
            pid:0,
            name:'',
            sort:0,
            icon:''
          },
          rules:{
            name:{
              required:true
            },
            sort:{
              required:true,
              number:true
            },
            icon:{
              required:true
            },
          },
          message:{
            name:{
              required:"请输入菜单名称"
            },
            sort:{
              required:"请输入排序值",
              number:"排序值必须为数字"
            },
            icon:{
              required:"请选择菜单图标"
            },
          }
        }
      }
    },
    mounted:function () {
      let breadcrumb=[
        {
          link: '#',
          title:'系统设置'
        },
        {
          link:'',
          title:'后台菜单'
        },

      ]
      this.$store.commit('SET_BREADCRUMB',breadcrumb)

    },
    methods:{
      addItem:function(){
        this.form.data={
          id:'',
          type:0,
          pid:0,
          name:'',
          sort:0,
          icon:''
        }
        this.$refs.modal.show()
      },
      deleteItem:function () {

        let table=this.$refs.tableBox
        let id=table.getSelectedRowId()[0]
        if(!id){
          this.$toast({
            title: '请选择一行数据'
          })
          return
        }

        this.$confirm({
          content:"删除操作不能恢复，您确定要删除吗",

          success:function () {
            let post_data={
              id: id,
              operation:'delete'
            }
            network.post(api.menu_save,post_data).then((res)=>{
              table.refresh()
            })
          },
        })


      },
      editItem:function () {
        let table=this.$refs.tableBox
        let data=table.getSelectedRowData()[0]
        if(!data){
          this.$toast({
            title: '请选择一行数据',
          })
          return
        }

        this.form.data={...data}
        this.$refs.modal.show()

      },
      formSubmit:function () {

        console.log("ov")
        let form_data={...this.form.data}

        let validation=formValidation.validate(this.form.rules,form_data,this.form.message)
        if(validation.code=='FAIL'){
          this.$toast({
            title:validation.msg,
            type:'error'
          })
          return false
        }

        network.post(api.menu_save,{
          ...form_data
        }).then((res)=>{
          this.$toast({
            title:"保存成功"
          })
          let table=this.$refs.tableBox
          table.refresh()
        })


        this.$refs.modal.hide()

      }

    }
  }
</script>

<style lang="less" scoped>

</style>
