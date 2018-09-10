<template>
  <div>
    <p id="test2">首页内容</p>
    <div id="test">{{message}}</div>
    <table-box ref="tableBox" :url="table.url" :columns="table.columns" :key-name="table.keyName" :parse-data="table.parseData" :data="table.data" :multi-select="table.multiSelect">

      <tr slot="row"  slot-scope="props">
        <td class="tc">{{props.index}}</td>
        <td><img :src="props.item.avatar" width="50" height="50"/></td>
        <td>{{props.item.nickname}}</td>
        <td>{{props.item.province}}-{{props.item.city}}</td>
        <td class="tc">{{props.item.sex}}</td>
        <td>{{props.item.created_at}}</td>
      </tr>


    </table-box>
  </div>
</template>

<script>

  import TableBox from '../../components/mod/TableBox'

  import authorize from '../../utils/base/authorize'
  import api from '../../utils/config/api'
  import network from '../../utils/base/network'
  import {SET_BREADCRUMB} from "../../store/mutation-types";

  export default {
    name: 'Index',
    components: {TableBox},

    data:function () {
      return {
        message:'ceshi',
        table:{
          url:api.member_index,
          multiSelect:false,
          keyName:'id',
          columns:[
            {
              title:"头像",
              field:"avatar",
              width:'80'
            },
            {
              title:"昵称",
              field:"nickname",
              width:''
            },
            {
              title:"所在地区",
              field:"province",
              width:''
            },
            {
              title:"性别",
              field:"sex",
              width:'80'
            },
            {
              title:"注册时间",
              field:"created_at",
              width:'160'
            },

          ],
          parseData:function (data) {
            data.forEach(function(row){
              row.sex=row.sex==1?'男':'女'
            })
          }
        }
      }
    },
    beforeCreate:function(){
      console.log('====父组件：beforeCreate=====')
    },
    created:function(){
      console.log('====父组件：created=====')
    },
    beforeMount:function(){
      console.log('====父组件：beforeMount=====')
    },
    beforeUpdate:function(){
      console.log('====父组件： beforeUpdate=====')
    },


    methods:{
     test:function () {
       console.log("methods-test")
     }
    },
    mounted:function () {
      console.log('====父组件：mounted=====')



      let breadcrumb=[
        {
          link: '/index',
          title:'首页哈哈'
        },
        {
          link:'/member/index',
          title:'用户管理哈哈'
        },
        {
          link:'/member/edit',
          title:'编辑用户'
        }
      ]
      this.$store.commit(SET_BREADCRUMB,breadcrumb)
    }
  }
</script>

<style lang="less" scoped>

</style>
