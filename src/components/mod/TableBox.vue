<template>
  <div class="table-wrap" :class="{scroll:scroll}">
    <div class="loading" v-if="loading">
      <div class="loading-icon"></div>
    </div>

    <div class="table-header" ref="tableHead">
      <table class="table table-bordered">
        <thead>
        <tr>
          <th width="80">序号</th>
          <th v-for="column in columns" :width="column.width">{{column.title}}</th>
        </tr>
        </thead>
      </table>

    </div>
    <div class="table-body" ref="tableBody" @scroll="tableScroll">

      <table class="table table-bordered">
        <thead>
        <tr class="tr-hide">
          <th width="80">序号</th>
          <th v-for="column in columns" :width="column.width">{{column.title}}</th>
        </tr>
        </thead>
        <tbody>
        <slot name="row" v-for="(item,index) in items"  :item="item" :index="rowIndex(index)">
          <tr>
            <td class="tc">{{rowIndex(index)}}</td>
            <td  v-for="column in columns">
              {{item[column.field]}}
            </td>
          </tr>
        </slot>
        </tbody>
      </table>
    </div>
    <div class="table-page">
      <div class="page-info">
        <span>纪录总数:</span><span class="total">{{total}}</span><span>，共</span><span  class="total">{{total_page}}</span><span>页，</span>
        <span>每页显示:</span>
        <select name="dataTable-pagesize" class="form-control input-sm" v-model="pagesizeIn" @change="changePagesize">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select> 条记录
      </div>
      <div class="page-pagination">
        <ul>
          <li class="first" :class="{disabled:page==1}" @click="page>1&&requestData(1)">首页</li>
          <li class="pre" :class="{disabled:page==1}"  @click="page>1&&requestData(page-1)">上一页</li>
          <li v-for="p in pages" :class="{active:p==page}"  @click="p!=page&&requestData(p)">{{p}}</li>
          <li class="next" :class="{disabled:page==total_page}"  @click="page<total_page&&requestData(page+1)">下一页</li>
          <li class="last" :class="{disabled:page==total_page}"  @click="page<total_page&&requestData(total_page)">尾页</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name:'TableBox',
    props:{
      url:String,
      params:{
        type:Object,
        default:function () {
          return {}
        }
      },
      columns:Array,
      keyName:{
        type:String,
        default:'id'
      },
      pagesize:{
        type:Number,
        default:10
      },
      parseData:Function,
      data:Array,
      multiSelect:{
        type:Boolean,
        default:false
      },
      autoLoad:{
        type:Boolean,
        default:true
      }
    },
    watch:{
      url:function(){
        this.reload()
      },
      params:function(){
        this.reload()
      },
      data:function (newdata) {
        this.requestData(this.page)
      }
    },
    data:function () {
      return {
        items:[],
        page:1,
        total:0,
        scroll:false,
        total_page:1,
        pages:[],
        select_rows:[],
        pagesizeIn:this.pagesize,
        loading:false
      }
    },
    computed:{

    },
    mounted:function () {
      if(this.autoLoad){
        this.requestData(this.page)
      }

    },
    methods:{
      rowIndex:function (index) {
        return (this.page-1)*this.pagesizeIn+index+1
      },
      tableScroll:function () {
        this.$refs.tableHead.scrollLeft=this.$refs.tableBody.scrollLeft
      },
      setPage:function () {
        //计算分页相关信息

        this.total_page=Math.ceil(this.total/this.pagesizeIn)

        let start_page = (this.page-4)<1?1:(this.page-4)
        let last_page = (this.page+4)>this.total_page?this.total_page:(this.page+4)
        this.pages=[]
        for(let i=start_page;i<=last_page;i++){
          this.pages.push(i)
        }
      },
      requestData:function(page){
        //请求数据

        if(this.url){
          this.loading=true
          this.$network.get(this.url,{
            page:page,
            page_size:this.pagesizeIn,
            ...this.params
          },true).then(res=>{
            this.page=page
            this.items=res.items
            this.total=res.total
            if(this.parseData){
              this.parseData(this.items)
            }

            this.setPage()
            this.setEvent()
            this.loading=false
          }).catch((err)=>{
            this.loading=false
            console.log("table请求失败:"+err)
          })
        }else if(this.data){
          this.page=page
          this.total=this.data.length
          this.items=[]
          for(let i=0;i<this.pagesizeIn;i++){
            let index=(this.page-1)*this.pagesizeIn+i
            if(index<=this.data.length-1){
              this.items.push(this.data[index])
            }
          }
          if(this.parseData){
            this.parseData(this.items)
          }
          this.setPage()
          this.setEvent()


        }else{
          console.log("url 和 data 至少应该有一个")
        }


      },
      setEvent:function(){
        //判断设置滚动条
        //给tr点击添加事件
        let that=this


        //置空所有的选中情况
        this.select_rows=[]

        setTimeout(()=>{

          if(this.$refs.tableBody.offsetHeight<this.$refs.tableBody.scrollHeight){
            this.scroll=true
          }

          let trs=this.$refs.tableBody.getElementsByTagName("tbody")[0].childNodes

          for(let i=0;i<trs.length;i++){
            trs[i].className="" //初始都为非选中状态

            trs[i].onclick=function (e) {

              if(that.multiSelect){
                //如果是多选
                if(this.className=="active"){
                  this.className=""
                  let index = that.select_rows.indexOf(i);
                  if (index > -1) {
                    that.select_rows.splice(index, 1);
                  }
                }else {
                  this.className="active"
                  that.select_rows.push(i)
                }


              }else {
                if (e.shiftKey==1&&that.getSelectedRowId().length>0)
                {
                  console.log("shift被按下了")
                  //如果已经选中了1个，那么就全选一批

                  let has_select='';
                  for(let j=0;j<trs.length;j++){
                    if(trs[j].className=='active'){
                      has_select=j;
                      break
                    }
                  }
                  let min=has_select>i?i:has_select
                  let max=has_select>i?has_select:i

                  for(let j=min,k=0;j<=max;j++,k++){
                    trs[j].className='active'
                    that.select_rows[k]=j
                  }
                  that.select_rows.length=max-min+1



                }else {
                  //如果是单选
                  //删除其他元素的active样式
                  for(let j=0;j<trs.length;j++){
                    trs[j].className=''
                  }
                  this.className="active"
                  that.select_rows[0]=i
                  that.select_rows.length=1
                }

              }
            }
          }

        },50)
      },


      getSelectedRowId:function () {
        let s_row_ids=[]
        for(let i=0;i<this.select_rows.length;i++){
          let row_data=this.items[this.select_rows[i]]
          s_row_ids.push(row_data[this.keyName])
        }

        return s_row_ids
      },
      getSelectedRowParam:function (field) {
        let s_row_ids=[]
        for(let i=0;i<this.select_rows.length;i++){
          let row_data=this.items[this.select_rows[i]]
          s_row_ids.push(row_data[field])
        }

        return s_row_ids
      },

      getSelectedRowData:function () {
        let s_row_datas=[]
        for(let i=0;i<this.select_rows.length;i++){
          let row_data=this.items[this.select_rows[i]]
          s_row_datas.push(row_data)
        }

        return s_row_datas
      },
      refresh:function () {
        this.requestData(this.page)
      },
      reload:function(){
        //重新请求第一页
        this.page=1
        this.requestData(this.page)
      },
      changePagesize:function () {
        this.page=1
        this.refresh()
      }
    }

  }
</script>

<style scoped lang="less">

  @import "../../less/variable";

  @keyframes rotateZ {
    0%{
      transform: rotateZ(0);
    }
    100%{
      transform: rotateZ(360deg);
    }
  }

  .table-wrap{
    width: 100%;
    position: relative;
    box-sizing: border-box;
    border: 1px solid #eef1f5;
    overflow: auto;
    /*background-color: #fcfbfb;*/
    margin-top: 5px;

    &.scroll{
      .table-header{
        margin-right: 4px;
      }
      .table-body{
        &::-webkit-scrollbar{
          width: 4px;
          background: none;
        }
        &::-webkit-scrollbar-track{
          width: 4px;
          background-color: #fcfbfb;

        }
        &::-webkit-scrollbar-thumb{
          width: 4px;

          background-color: #7e7e7e;
        }
      }
    }

    table{
      border-collapse:collapse;
      border-spacing:0;
      table-layout:fixed;
      margin-bottom: 0px !important;
      border: none;
    }

    .table-header{
      overflow: hidden;
      background-color: #f6f8fb;
      thead{
        background-color: #fbfbfb;
        th{
          border: 1px solid #eef1f5;
          padding: 15px 10px;
          text-align: center;
          font-size: 14px;
          position: relative;

          .dragger{
            display: block;
            position: absolute;
            right: -10px;
            top: 0;
            width: 20px;
            height: 100%;
            cursor: col-resize;
          }

          &:first-child{
            border-left: 1px solid transparent;
          }
          &:last-child{
            border-right: 1px solid transparent;
          }

        }
      }
    }

    .loading{
      position: absolute;
      z-index: 100;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(238,238,238,0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      .loading-icon{
        width: 60px;
        height: 60px;

        border-bottom: 6px solid #ccc;
        border-top: 6px solid #ccc;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-radius: 100%;
        animation: rotateZ 1s linear infinite;
      }
    }
    .table-body{
      margin-top: 0px;
      min-height: 300px;
      max-height: 470px;
      padding-bottom: 10px;
      background-color: white;
      overflow: scroll;
      position: relative;

      &::-webkit-scrollbar{
        width: 0px;
        background: none;
      }
      &::-webkit-scrollbar-track{
        width: 0px;
        background-color: #fcfbfb;

      }
      &::-webkit-scrollbar-track-piece{
        background-color: white;
      }
      &::-webkit-scrollbar-thumb{
        width: 0px;
        background-color: #7e7e7e;
      }


      .tr-hide,.tr-hide th{
        visibility: hidden;
        height: 0;
        border-top-width: 0px;
        border-bottom-width: 0px;
        padding-top: 0px;
        padding-bottom: 0px;
        line-height: 0px;
        color: red;
      }
      tbody{
        tr{
          &.selected{
            background-color: #EFEFEF!important;
          }
        }
        td{
          border: 1px solid #eef1f5;
          padding: 10px;
          font-size: 14px;
          word-wrap: break-word;
          &:last-child{
            border-right: 1px solid transparent;
          }

          &:first-child{
            border-left: 1px solid transparent;
          }

          a.title{
            color: @brand-color;
            font-weight: 600;
          }

        }
        .tc{
          text-align: center;
        }
      }

    }
  }

  .table-page{
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    padding: 10px;

    .page-info{
      .total{
        margin-left: 5px;
        margin-right: 5px;
        font-weight: 600;
      }
      select{
        display: inline-block;
        width: 50px;
      }
    }
    .page-pagination{
      ul{
        li{
          display: inline;
          float: left;
          list-style: none;
          padding: 5px 10px;
          border: 1px solid #eeeeee;
          margin: 0px;
          color:  @brand-color;
          cursor: pointer;
          &.active{
            background-color: @brand-color;
            border-color: @brand-color;
            color: white;
          }

          &.disabled{
            color: #777;
            cursor: not-allowed;
          }
        }
      }
    }
  }
</style>
