<template>
  <div>
    <div class="row h44">
      <div class="col-xs-6">

      </div>
      <div class="col-xs-6 flex-end-center">
        <button-box type="add" to="/banner/edit" title="添加伦轮播"></button-box>
        <button-box type="edit" @click="editItem"></button-box>
        <button-box type="online" @click="onlineItem"></button-box>
        <button-box type="offline" @click="offlineItem"></button-box>
        <button-box type="delete" @click="deleteItem"></button-box>
      </div>
    </div>

    <tab-table ref="tabTable" :active-index="tab.activeIndex" :toggles="tab.toggles" :contents="tab.contents">

      <template v-for="(toggle,index) in tab.toggles" :slot="'row'+index" slot-scope="props">
        <tr>
          <td class="tc">{{props.index}}</td>
          <td>{{props.item.position}}</td>
          <td><img :src="props.item.image" width="80" height="80"/></td>
          <td>{{props.item.valid_start_date}}－{{props.item.valid_end_date}}</td>
          <td class="tc">{{props.item.sort_order}}</td>
          <td class="tc">{{props.item.status_text}}</td>
          <td>{{props.item.create_at}}</td>
        </tr>
      </template>

    </tab-table>


  </div>
</template>

<script>

  import helper from '../../utils/base/helper'

  import TabTable from '../../components/mod/TabTable'
  import ButtonBox from  '../../components/mod/ButtonBox'

  let table_tpl={
    keyName:'id',
      columns:[
      {
        title:"展示位置",
        field:"position",
        width:'80'
      },
      {
        title:"轮播图",
        field:"image",
        width:'80'
      },
      {
        title:"展示起止时间",
        field:"time",
        width:'120'
      },
      {
        title:"排序值",
        field:"sort",
        width:'40'
      },
      {
        title:"状态",
        field:"status",
        width:'60'
      },
      {
        title:"创建时间",
        field:"create_at",
        width:'140'
      },

    ],
    parseData:function (data) {
      data.forEach(function(row){
        if(row.status==0){
          row.status_text="未上线"
        }else if(row.status==1){
          row.status_text="已上线"
        }else {
          row.status_text="未知"
        }

        row.create_at=helper.phpTimeToJsTime(row.create_at)
      })
    }
  }

  export default {
    name: 'RolesIndex',
    components: {TabTable,ButtonBox},

    data:function () {
      return {

        tab:{
          activeIndex:0,
          toggles:['未上线','已上线','已过期'],
          contents:[
            {
              url:this.$api.banner_index+'?status=0&valid=1',
              ...table_tpl
            },
            {
              url:this.$api.banner_index+'?status=1&valid=1',
              ...table_tpl
            },
            {
              url:this.$api.banner_index+'?valid=0',
              ...table_tpl
            },
          ]

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
          title:'焦点图'
        },

      ]
      this.$store.commit('SET_BREADCRUMB',breadcrumb)
    },
    methods:{

      editItem:function () {
        let tabTable=this.$refs.tabTable
        let id=tabTable.getSelectedRowId()[0]
        if(!id){
          this.$toast({
            title: '请选择一行数据'
          })
          return
        }
        this.$router.push({path:'/banner/edit',query:{
          id:id
        }})

      },
      deleteItem:function () {

        let tabTable=this.$refs.tabTable
        let id=tabTable.getSelectedRowId()[0]
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
              status:9,
              operation:'updateStatus'
            }
            this.$network.post(this.$api.banner_save,post_data).then((res)=>{
              tabTable.refresh()
            })
          },
        })


      },
      onlineItem:function () {
        let tabTable=this.$refs.tabTable
        let id=tabTable.getSelectedRowId()[0]
        if(!id){
          this.$toast({
            title: '请选择一行数据',
          })
          return
        }
        let post_data={
          id: id,
          status:1,
          operation:'updateStatus'
        }
        this.$network.post(this.$api.banner_save,post_data).then((res)=>{
          tabTable.refresh()
        })
      },
      offlineItem:function () {
        let tabTable=this.$refs.tabTable
        let id=tabTable.getSelectedRowId()[0]
        if(!id){
          this.$toast({
            title: '请选择一行数据',
          })
          return
        }
        let post_data={
          id: id,
          status:0,
          operation:'updateStatus'
        }
        this.$network.post(this.$api.banner_save,post_data).then((res)=>{
          tabTable.refresh()
        })
      }

    }
  }
</script>

<style lang="less">


</style>
