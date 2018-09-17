<template>
  <div>
    <div class="row h44">
      <form @submit.prevent="queryData" class="query">

        <label-radio :options="options" v-model="query.quick_period" @change="changeQuickPeriod"></label-radio>
        <input type="date" v-model="query.startDate" @change="query.quick_period=''"  class="form-control" style="width:180px;margin-left: 10px" />
        <span>&nbsp;-&nbsp;</span>
        <input type="date" v-model="query.endDate" @change="query.quick_period=''" class="form-control" style="width:180px;" />
        <button-box type="search" @click="queryData"></button-box>
      </form>
    </div>


    <echarts ref="memberChart" :option="echarts.member.options" :url="echarts.member.url" :params="query" :parseData="echarts.member.parseData" width="100%" height="300"></echarts>


  </div>
</template>

<script>


  import ButtonBox from '../../components/mod/ButtonBox'
  import LabelRadio from '../../components/proj/LabelRadio'
  import  Echarts from  '../../components/mod/Echarts'

  export default {
    name: 'StatsMember',
    components: {LabelRadio,ButtonBox,Echarts},

    data:function () {
      return {
        options:[
          {
            title:'最近7天',
            value:7
          },
          {
            title:'最近30天',
            value:30
          },
        ],
        query:{
          quick_period:7,
          startDate:'',
          endDate:'',
        },
        echarts:{
          member:{
            url:this.$api.stats_member_graph,
            options:{
              tooltip: {
                trigger: "axis"
              },
              legend: {
                data: ["注册用户","注册用户2"]
              },
              toolbox: {
                feature: {
                  mark: {
                    show: true
                  },
                  dataView: {
                    show: true,
                    readOnly: true
                  },
                  magicType: {
                    show: false,
                    type: ["line", "bar"]
                  },
                  restore: {
                    show: true
                  },
                  saveAsImage: {
                    show: true
                  }
                }
              },
              calculable: true,
              xAxis: [
                {
                  type: "category",
                  data: [],
                  boundaryGap: false,
                  position: "bottom"
                }
              ],
              yAxis: [
                {
                  type: "value",
                  name: "数量",
                  nameLocation: "end"
                }
              ],
              series: [
              ]
            },
            parseData:function (res,echart) {
              let d = res || [],
                x = [],
                y = [];

              d.forEach(function(item){
                x.push(item.create_date);
                y.push(item.member_count);
              });


              echart.setOption({
                xAxis: {
                  data: x
                },
                series: [
                  {
                    name: "注册用户",
                    type: "line",
                    data: y
                  },
                ]
              });
            }
          }
        },
      }
    },
    mounted:function () {
      let breadcrumb=[
        {
          link: '#',
          title:'统计分析'
        },
        {
          link:'',
          title:'用户统计'
        },

      ]
      this.$store.commit('SET_BREADCRUMB',breadcrumb)


    },
    methods:{

      queryData() {
        this.$refs.memberChart.reload()
      },
      changeQuickPeriod(){
        this.query.startDate=''
        this.query.endDate=''
        this.queryData()
      },
    }
  }
</script>

<style scoped lang="less">
  .query{
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
