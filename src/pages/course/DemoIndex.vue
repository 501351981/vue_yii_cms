<template>
  <div>
    <div class="row h44">
      <div class="col-xs-6">
        <form @submit.prevent="queryData" class="query">
          <input type="text" v-model="query.keywords" placeholder="根据用户昵称搜索"  class="form-control" style="width:200px;float: left" />
          <button-box type="search" @click="queryData"></button-box>
        </form>
      </div>
      <div class="col-xs-6 flex-end-center">
        <button-box type="add" to="/demo/edit" title="添加"></button-box>
        <button-box type="edit" @click="editItem"></button-box>
        <button-box type="delete" @click="deleteItem"></button-box>
      </div>
    </div>

    <table-box ref="tableBox" :url="table.url" :columns="table.columns" :key-name="table.keyName" :parse-data="table.parseData" :data="table.data" :multi-select="table.multiSelect">

      <tr slot="row"  slot-scope="props">
        <td class="tc">{{props.index}}</td>
        <td><router-link :to="'/demo/edit?id='+props.item.id" class="title">{{props.item.name}}</router-link></td>
      </tr>


    </table-box>


  </div>
</template>

<script>

  import api from '../../utils/config/api'
  import network from '../../utils/base/network'


  import TableBox from '../../components/mod/TableBox'
  import ButtonBox from  '../../components/mod/ButtonBox'


  export default {
    name: 'CategoryIndex',
    components: {TableBox,ButtonBox},

    data:function () {
      return {
        query:{
          keywords:''
        },
        table:{
          url:api.demo_index,
          multiSelect:false,
          keyName:'id',
          columns:[
            {
              title:"名称",
              field:"name",
              width:''
            },


          ],
          parseData:function (data) {
            data.forEach(function(row){

            })
          }
        },

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
          title:'demo管理'
        },

      ]
      this.$store.commit('SET_BREADCRUMB',breadcrumb)
    },
    methods:{
      editItem:function () {
        let table=this.$refs.tableBox
        let id=table.getSelectedRowId()[0]
        if(!id){
          this.$toast({
            title: '请选择一行数据',
          })
          return
        }
        this.$router.push({path:'/demo/edit',query:{
            id:id,
          }})

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
              status:9,
              operation:'delete'
            }
            network.post(api.demo_save,post_data).then((res)=>{
              table.refresh()
            })
          },
        })


      },

      queryData:function () {
        let tableBox=this.$refs.tableBox
        tableBox.reload({
          keywords:this.query.keywords
        })
      }

    },
    beforeRouteEnter:function (to,from,next) {
      //从编辑页面返回到列表，应该刷新一下当前页面
      if(from.path=='/demo/edit'){
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
