<template>
  <div>
    <div class="row h44">
      <div class="col-xs-6">
        <p><span style="color: red">{{ptitle}}</span> 的子菜单</p>
      </div>
      <div class="col-xs-6 flex-end-center">
        <button-box type="add" @click="addItem" title="添加菜单"></button-box>
        <button-box type="edit" @click="editItem"></button-box>
        <button-box type="delete" @click="deleteItem"></button-box>
      </div>
    </div>

    <table-box ref="tableBox" :url="table.url" :columns="table.columns" :key-name="table.keyName" :parse-data="table.parseData" :data="table.data" :multi-select="table.multiSelect">

      <tr slot="row"  slot-scope="props">
        <td class="tc">{{props.index}}</td>
        <td>{{props.item.name}}</td>
        <td>{{props.item.sort}}</td>
        <td>{{props.item.url}}</td>
        <td>{{props.item.action}}</td>
      </tr>


    </table-box>

    <modal @ok="formSubmit" ref="modal">
      <form class="form-horizontal form-edit">

        <input type="hidden" v-model="form.data.id"/>
        <input type="hidden" v-model="form.data.type"/>
        <input type="hidden" v-model="form.data.pid"/>
        <div class="form-group">
          <div class="col-xs-12">
            <input class="form-control form-field" placeholder="菜单名称" v-model="form.data.name"/>
          </div>
        </div>

        <div class="form-group">
          <div class="col-xs-12">
            <input class="form-control form-field" placeholder="排序值" v-model="form.data.sort"/>
          </div>
        </div>

        <div class="form-group">
          <div class="col-xs-12">
            <input class="form-control form-field" placeholder="要跳转的url" v-model="form.data.url"/>
          </div>
        </div>
        <div class="form-group">
          <div class="col-xs-12">
            <textarea class="form-control form-field" placeholder="该菜单下所有链接" v-model="form.data.action" rows="3"></textarea>
          </div>
        </div>

      </form>
    </modal>

  </div>
</template>

<script>

  import formValidation from '../../utils/base/formValidation'

  import TableBox from '../../components/mod/TableBox'
  import ButtonBox from  '../../components/mod/ButtonBox'
  import Modal from '../../components/mod/Modal'
  import FormSubmit from "../../components/mod/FormSubmit"

  export default {
    name: 'CategoryIndex',
    components: {TableBox,ButtonBox,Modal,FormSubmit},

    data:function () {
      return {
        ptitle:'',
        table:{
          url:this.$api.menu_children+'?pid='+this.$route.query.pid,
          multiSelect:false,
          keyName:'id',
          columns:[
            {
              title:"名称",
              field:"name",
              width:'150'
            },
            {
              title:"排序值",
              field:"value",
              width:'100'
            },
            {
              title:"跳转链接",
              field:"url",
              width:'260'
            },
            {
              title:"菜单下所有链接",
              field:"action",
              width:'1000'
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
            pid:this.$route.query.pid,
            name:'',
            sort:0,
            url:'',
            action:''
          },
          rules:{
            name:{
              required:true
            },
            url:{
              required:true
            },
            action:{
              required:true
            },
          },
          message:{
            name:{
              required:"菜单名称不能为空"
            },
            url:{
              required:"链接不能为空"
            },
            action:{
              required:"该菜单下所有链接不能为空"
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
          link:'/menu/index',
          title:'后台菜单'
        },
        {
          link:'',
          title:'子菜单'
        },

      ]
      this.$store.commit('SET_BREADCRUMB',breadcrumb)
      this.ptitle=this.$route.query.ptitle
    },
    methods:{
      addItem:function(){
        this.form.data={
          id:'',
          type:0,
          pid:this.$route.query.pid,
          name:'',
          sort:0,
          url:'',
          action:''
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

          success: ()=> {
            let post_data={
              id: id,
              operation:'delete'
            }
            this.$network.post(this.$api.menu_save,post_data).then((res)=>{
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

        let form_data={...this.form.data}

        let validation=formValidation.validate(this.form.rules,form_data,this.form.message)
        if(validation.code=='FAIL'){
          this.$toast({
            title:validation.msg,
            type:'error'
          })
          return false
        }

        this.$network.post(this.$api.menu_save,{
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
