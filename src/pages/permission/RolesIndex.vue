<template>
  <div>
    <div class="row h44">
      <div class="col-xs-6">

      </div>
      <div class="col-xs-6 flex-end-center">
        <button-box type="add" to="/roles/edit" title="添加角色"></button-box>
        <button-box type="edit" @click="editItem"></button-box>
        <button-box type="delete" @click="deleteItem"></button-box>
      </div>
    </div>

    <table-box ref="tableBox" :url="table.url" :columns="table.columns" :key-name="table.keyName" :parse-data="table.parseData" :data="table.data" :multi-select="table.multiSelect">

        <tr slot="row"  slot-scope="props">
          <td class="tc">{{props.index}}</td>
          <td>{{props.item.description}}</td>
          <td>{{props.item.data}}</td>
        </tr>


    </table-box>

  </div>
</template>

<script>


  import TableBox from '../../components/mod/TableBox'
  import ButtonBox from  '../../components/mod/ButtonBox'

  export default {
    name: 'RolesIndex',
    components: {TableBox,ButtonBox},

    data:function () {
      return {
        table:{
          url:this.$api.roles_index+'?sort=-createdAt',
          multiSelect:false,
          keyName:'name',
          columns:[
            {
              title:"角色名称",
              field:"description",
              width:'250'
            },
            {
              title:"角色描述",
              field:"data",
              width:''
            },
          ],
          parseData:function (data) {
            data.forEach(function(row){

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
          title:'系统角色'
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

          success: ()=> {
            let post_data={
              id: id,
              status:3,
              operation:'updateStatus'
            }
            this.$network.post(this.$api.roles_save,post_data).then((res)=>{
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
        this.$router.push({path:'/roles/edit',query:{
          id:id
        }})

      },

    },
    beforeRouteEnter:function (to,from,next) {
      //从编辑页面返回到列表，应该刷新一下当前页面
      if(from.path=='/roles/edit'){
        next(vm=>{
          vm.$refs.tableBox.refresh()
        })
      }
      next()
    }
  }
</script>

<style lang="less" scoped>

</style>
