<template>
  <div class="tab">
    <ul class="tab-toggles">
      <li v-for="(toggle,index) in toggles" :class="{active:index==currentIndex}" @click="toggleTab(index)">{{toggle}}</li>
    </ul>
    <div class="tab-content">

      <div class="tab-panel" v-for="(table,index) in contents" v-show="index==currentIndex">
        <keep-alive>
          <table-box :ref="'tableBox'+index"  :url="table.url" :params="params" :columns="table.columns" :key-name="table.keyName" :parse-data="table.parseData" :auto-load="false" :multi-select="table.multiSelect">
            <template slot="row" slot-scope="props">
              <slot :name="'row'+index" :item="props.item" :index="props.index"></slot>
            </template>
          </table-box>
        </keep-alive>

      </div>

    </div>
  </div>
</template>

<script>
  import TableBox from './TableBox'

  export default {
    name:'TabTable',
    components:{TableBox},
    props:{
      activeIndex:Number,
      toggles:Array,
      contents:Array,
      params:Object

    },
    data:function () {
      return {
        currentIndex:this.activeIndex,
        loadStatus:[]
      }
    },
    mounted:function () {
      this.init()
    },
    methods:{
      init(){
        this.resetLoadStatus()
        this.reload()

      },
      resetLoadStatus(){
        for(let i=0;i<this.toggles.length;i++){
          this.loadStatus[i]=false //所有的表格都未加载
        }
      },
      reload(){
        let tableBox=this.$refs['tableBox'+this.currentIndex]
        tableBox[0].reload()
        this.loadStatus[this.currentIndex]=true
      },
      refresh(){
        let tableBox=this.$refs['tableBox'+this.currentIndex]
        tableBox[0].refresh()
        this.resetLoadStatus()
        this.loadStatus[this.currentIndex]=true
      },
      getSelectedRowId(){
        let tableBox=this.$refs['tableBox'+this.currentIndex]
        return tableBox[0].getSelectedRowId()
      },
      getSelectedRowParam(field){
        let tableBox=this.$refs['tableBox'+this.currentIndex]
        return tableBox[0].getSelectedRowParam(field)
      },
      getSelectedRowData(){
        let tableBox=this.$refs['tableBox'+this.currentIndex]
        return tableBox[0].getSelectedRowData()
      },
      toggleTab(index) {
        this.currentIndex=index
        if(!this.loadStatus[index]){
          this.reload()
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../less/variable";

  .tab{
    .tab-toggles{
      border-bottom: 1px solid #ddd;
      li{
        display: inline-block;
        list-style: none;
        padding: 0 25px;
        line-height: 36px;
        height: 36px;
        border-radius: 2px;
        background-color: #fff;
        box-shadow: 0 2px 2px 0 rgba(225,225,225,.5);
        font-size: 14px;
        color: #686768;
        cursor: pointer;
        &.active{
          color: #fff;
          background-color: @brand-color;
        }
      }
    }

    .tab-content{

    }
  }
</style>
