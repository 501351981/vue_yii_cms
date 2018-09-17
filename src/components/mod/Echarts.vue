<template>
  <div class="echarts" :style="{width:w,height:h}">
    <div :id="domCharts" class="echarts-canvas"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import helper from '../../utils/base/helper'

  export default {
    name:'Echarts',
    props:{
      option:Object,
      url:String,
      params:Object,
      parseData:Function,
      width:[String,Number],
      height:[String,Number],

    },
    computed:{
      w:function () {
        if(!isNaN(this.width)){
          return this.width+'px';
        }else if(this.width.indexOf('%')!= -1) {
          return this.width
        }else {
          return this.width+'px';
        }
      },
      h:function () {
        if(!isNaN(this.height)){
          return this.height+'px';
        }else if(this.height.indexOf('%')!= -1) {
          return this.height
        }else {
          return this.height+'px';
        }
      }
    },
    data:function () {
      return{
        domCharts:'chart-'+ helper.randomString(20),
        myEcharts:''
      }
    },
    watch:{
      'params':function () {
        this.reload()
      }
    },
    mounted:function(){
      this.init()
    },
    methods:{
      init(){
        this.myEcharts=echarts.init(document.getElementById(this.domCharts));
        this.myEcharts.setOption(this.option)
        this.reload()
      },
      reload(){
        this.myEcharts.showLoading()
        this.$network.get(this.url,this.params).then(res=>{
          this.myEcharts.hideLoading()
          this.parseData(res,this.myEcharts)
        })
      }

    }


  }
</script>

<style scoped lang="less">
  .echarts{
    .echarts-canvas{
      width: 100%;
      height: 100%;
    }
  }

</style>
