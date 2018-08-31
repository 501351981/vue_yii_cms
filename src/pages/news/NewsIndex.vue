<template>
  <div>
    <div class="row h44">
      <div class="col-xs-6">

      </div>
      <div class="col-xs-6 flex-end-center">
        <button-box type="add" to="/news/edit" title="添加"></button-box>
        <button-box type="edit" @click="editItem"></button-box>
        <button-box class="btn-danger" @click="postToBaidu"><i class="fa fa-location-arrow"></i> 提交百度收录</button-box>
        <dropdown-menu class="btn-dropdown">
          <template slot="toggle">
            <button-box class="btn-info">更改状态 <i class="fa fa-sort-amount-asc"></i></button-box>
          </template>
          <template slot="menu">
            <a href="javascript:" @click="show">前台显示</a>
            <a href="javascript:" @click="hide">前台隐藏</a>
            <a href="javascript:" @click="recommend">推荐</a>
            <a href="javascript:" @click="cancleRecommend">取消推荐</a>
            <a href="javascript:" @click="top">置顶</a>
            <a href="javascript:" @click="cancleTop">取消置顶</a>
          </template>
        </dropdown-menu>
        <button-box type="delete" @click="deleteItem"></button-box>
      </div>
    </div>

    <table-box ref="tableBox" :url="table.url" :columns="table.columns" :key-name="table.keyName" :parse-data="table.parseData" :data="table.data" :multi-select="table.multiSelect">

        <tr slot="row"  slot-scope="props">
          <td class="tc">{{props.index}}</td>
          <td>{{props.item.category_text1}}</td>
          <td>{{props.item.title}}</td>
          <td class="tc">{{props.item.view_count}}</td>
          <td class="status">
            <span v-if="props.item.status==0" class="btn btn-default btn-sm">前台隐藏</span>
            <span v-if="props.item.recommend_ok==1" class="btn btn-primary btn-sm">已推荐</span>
            <span v-if="props.item.top_ok==1" class="btn btn-danger btn-sm">置顶</span>
          </td>
          <td>{{props.item.create_at}}</td>
          <td><span v-if="props.item.post_baidu==1" >已提交</span><span v-else>未提交</span></td>
          <td><a :href="pc_domain+'/news/detail/'+props.item.id+'.html'" class="btn btn-info btn-sm" target="_blank">预览</a></td>
        </tr>


    </table-box>

  </div>
</template>

<script>

  import api from '../../utils/config/api'
  import config from '../../utils/config/config'
  import network from '../../utils/base/network'

  import TableBox from '../../components/mod/TableBox'
  import ButtonBox from  '../../components/mod/ButtonBox'
  import DropdownMenu from '../../components/mod/DropdownMenu'

  export default {
    name: 'RolesIndex',
    components: {TableBox,ButtonBox,DropdownMenu},

    data:function () {
      return {
        table:{
          url:api.news_index,
          keyName:'id',
          columns:[
            {
              title:"所属分类",
              field:"category_text1",
              width:'80'
            },
            {
              title:"标题",
              field:"title",
              width:'300'
            },
            {
              title:"浏览量",
              field:"view_count",
              width:'80'
            },
            {
              title:"状态",
              field:"status",
              width:'150'
            },
            {
              title:"创建时间",
              field:"create_at",
              width:'140'
            },
            {
              title:"提交给百度",
              field:"post_baidu",
              width:'80'
            },
            {
              title:"预览",
              field:"preview",
              width:'80'
            },
          ],
          parseData:function (data) {
            data.forEach(function(row){

            })
          }
        },
        pc_domain:config.pc_domain
      }
    },
    mounted:function () {
      let breadcrumb=[
        {
          link: '#',
          title:'内容管理'
        },
        {
          link:'',
          title:'文章管理'
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
              status:9,
              operation:'delete'
            }
            network.post(api.news_save,post_data).then((res)=>{
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
        this.$router.push({path:'/news/edit',query:{
          id:id
        }})

      },
      postToBaidu:function () {
        let table=this.$refs.tableBox
        let id=table.getSelectedRowId()[0]
        if(!id){
          this.$toast({
            title: '请选择一行数据'
          })
          return
        }

        let post_data={
          id: id,
          post_baidu:1,
          operation:'post_baidu'
        }
        network.post(api.news_save,post_data).then((res)=>{
          table.refresh()
        })
      },
      show:function () {
        let table=this.$refs.tableBox
        let id=table.getSelectedRowId()[0]
        if(!id){
          this.$toast({
            title: '请选择一行数据'
          })
          return
        }

        let post_data={
          id: id,
          status:1,
          operation:'online'
        }
        network.post(api.news_save,post_data).then((res)=>{
          table.refresh()
        })
      },
      hide:function () {
        let table=this.$refs.tableBox
        let id=table.getSelectedRowId()[0]
        if(!id){
          this.$toast({
            title: '请选择一行数据'
          })
          return
        }

        let post_data={
          id: id,
          status:0,
          operation:'offline'
        }
        network.post(api.news_save,post_data).then((res)=>{
          table.refresh()
        })
      },
      recommend:function () {
        let table=this.$refs.tableBox
        let id=table.getSelectedRowId()[0]
        if(!id){
          this.$toast({
            title: '请选择一行数据'
          })
          return
        }

        let post_data={
          id: id,
          recommend_ok:1,
          operation:'recommend'
        }
        network.post(api.news_save,post_data).then((res)=>{
          table.refresh()
        })
      },
      cancleRecommend:function () {
        let table=this.$refs.tableBox
        let id=table.getSelectedRowId()[0]
        if(!id){
          this.$toast({
            title: '请选择一行数据'
          })
          return
        }

        let post_data={
          id: id,
          recommend_ok:0,
          operation:'c_recommend'
        }
        network.post(api.news_save,post_data).then((res)=>{
          table.refresh()
        })
      },
      top:function () {
        let table=this.$refs.tableBox
        let id=table.getSelectedRowId()[0]
        if(!id){
          this.$toast({
            title: '请选择一行数据'
          })
          return
        }

        let post_data={
          id: id,
          top_ok:1,
          operation:'top'
        }
        network.post(api.news_save,post_data).then((res)=>{
          table.refresh()
        })
      },
      cancleTop:function () {
        let table=this.$refs.tableBox
        let id=table.getSelectedRowId()[0]
        if(!id){
          this.$toast({
            title: '请选择一行数据'
          })
          return
        }

        let post_data={
          id: id,
          top_ok:0,
          operation:'c_top'
        }
        network.post(api.news_save,post_data).then((res)=>{
          table.refresh()
        })
      }

    }
  }
</script>

<style lang="less">
  .btn-dropdown{
    .dropdown-toggle{
      padding: 0 !important;
      &:hover{
        background-color: white !important;
      }
      .open&{
        background-color: white !important;
      }
    }
  }

  .status{
    .btn{
      padding: 3px 5px !important;
      margin-top: 5px;
      margin-bottom: 5px;
    }
  }


</style>
