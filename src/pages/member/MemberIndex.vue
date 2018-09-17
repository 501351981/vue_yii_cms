<template>
  <div>
    <div class="row h44">
      <div class="col-xs-6">
        <form @submit.prevent="queryData" class="query">
          <input type="text" v-model="query.keywords" placeholder="根据用户昵称搜索"  class="form-control" style="width:200px;float: left" />
         <button-box type="search" @click="queryData"></button-box>
        </form>
      </div>
      <div class="col-xs-6"></div>
    </div>

    <table-box ref="tableBox" :url="table.url" :params="query" :columns="table.columns" :key-name="table.keyName" :parse-data="table.parseData" :data="table.data" :multi-select="table.multiSelect">

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
  import ButtonBox from  '../../components/mod/ButtonBox'

  export default {
    name: 'MemberIndex',
    components: {TableBox,ButtonBox},

    data:function () {
      return {
        query:{
          keywords:''
        },
        table:{
          url:this.$api.member_index,
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
    mounted:function () {
      let breadcrumb=[
        {
          link: '/index',
          title:'首页'
        },
        {
          link:'',
          title:'用户管理'
        },

      ]
      this.$store.commit('SET_BREADCRUMB',breadcrumb)

      console.log('this.$router')
      console.log(this.$router)
    },
    methods:{
      queryData:function () {
        let tableBox=this.$refs.tableBox
        tableBox.reload()
        // let queryData={...this.query}
        // this.query=queryData
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
