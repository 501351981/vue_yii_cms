<template>
  <div>
    <div class="row h44">
      <div class="col-xs-6">

      </div>
      <div class="col-xs-6 flex-end-center">
        <button-box type="add" to="/administrators/edit" title="添加管理员"></button-box>
        <button-box type="edit" @click="editItem"></button-box>
        <button-box class="btn-warning" @click="resetPassword">重置密码</button-box>
        <button-box type="delete" @click="deleteItem"></button-box>
      </div>
    </div>

    <table-box ref="tableBox" :url="table.url" :columns="table.columns" :key-name="table.keyName" :parse-data="table.parseData" :data="table.data" :multi-select="table.multiSelect">

    </table-box>

  </div>
</template>

<script>
  import authorize from '../../utils/base/authorize'
  import api from '../../utils/config/api'
  import network from '../../utils/base/network'
  import helper from  '../../utils/base/helper'

  import TableBox from '../../components/mod/TableBox'
  import ButtonBox from  '../../components/mod/ButtonBox'

  export default {
    name: 'AdministratorsIndex',
    components: {TableBox,ButtonBox},

    data:function () {
      return {
        table:{
          url:api.user_index,
          multiSelect:false,
          keyName:'id',
          columns:[
            {
              title:"角色",
              field:"description",
              width:'150'
            },
            {
              title:"账号",
              field:"username",
              width:'120'
            },
            {
              title:"真实姓名",
              field:"realname",
              width:'120'
            },
            {
              title:"手机",
              field:"mobile",
              width:''
            },
            {
              title:"邮箱",
              field:"email",
              width:''
            },
            {
              title:"最后登录时间",
              field:"last_login_at",
              width:''
            },
          ],
          parseData:function (data) {
            data.forEach(function(row){
              row.last_login_at=helper.phpTimeToJsTime(row.last_login_at)
            })
          }
        }
      }
    },
    mounted:function () {
      let breadcrumb=[
        {
          link: '#',
          title:'权限管理'
        },
        {
          link:'',
          title:'后台管理员'
        },

      ]
      this.$store.commit('SET_BREADCRUMB',breadcrumb)
    },
    methods:{
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
            network.post(api.user_save,post_data).then((res)=>{
              table.refresh()
            })
          },
        })


      },
      editItem:function () {
        let table=this.$refs.tableBox
        let id=table.getSelectedRowId()[0]
        if(!id){
          this.$toast({
            title: '请选择一行数据',
          })
          return
        }
        this.$router.push({path:'/administrators/edit',query:{
            id:id
          }})

      },
      resetPassword:function () {
        let table=this.$refs.tableBox
        let id=table.getSelectedRowId()[0]
        if(!id){
          this.$toast({
            title: '请选择一行数据',
          })
          return
        }

        this.$router.push({
          path:'/administrators/pwd',
          query:{
            id:id
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
