<template>
  <div class="cascade">
    <select v-for="index in options.length" class="form-control" v-model="select[index-1]" @change="change(index-1)">
      <option v-if="options.firstOption[index-1]" value="">{{options.firstOption[index-1]}}</option>
      <option v-for="item in data[index-1]" :value="item[options.valueField]">{{item[options.textField]}}</option>
    </select>
  </div>
</template>

<script>
  let default_params={
    length:1,//级联长度
    url:'',//ajax请求地址
    textField:'',//ajax获取数据中文本对应名称
    valueField:'',//ajax获取数据中值对应名称
    paramField:'',//ajax获取数据中参数对应名称,比如id
    paramName:'',//ajax请求参数名称
    defaultParamName:'',//初始ajax请求参数名称
    defaultParam:0,//ajax请求的参数默认值
    valueSeparator: ',', //获取所有级联项的值时使用的分隔符，如果是英文逗号，返回的值形如 北京市,区,朝阳区
    firstOption:[],//第一个选项的内容{value:'',title:''}
    parseAjax:(res)=>{
      return res
    },//ajax数据的处理
    delay:0,//延迟，列表页搜索时，优先进行数据的拉取，没有必要先拉取筛选项，影响数据的拉取
  }
  export default {
    name:'CascadeSelect',
    props:{
      value:{
        type:String,
        default:''
      },
      config:Object
    },
    data:function () {
      return{
        options:Object.assign({},default_params,{...this.config}),
        data:[],//存储每级数据
        cache:{},//存储缓存数据，避免重复请求
        select:[]
      }
    },
    created:function () {
      setTimeout(()=>{
        this.init(0)
      },this.options.delay)
    },
    watch:{
      value (newValue) {
        if(newValue!=this.select.join(this.options.valueSeparator)){
          this.init(0)
        }

      }
    },
    methods:{
      init(index){
        let init_value=this.value.split(this.options.valueSeparator)
        if(init_value[index]||index==0){
          //如果不为空或者是第一个，那么要请求数据
          this.select[index]=init_value[index]?init_value[index]:''

          if(this.options.url){
            this.$network.get(this.options.url,{
              [index==0?this.options.defaultParamName:this.options.paramName]: index==0?this.options.defaultParam:this.select[index-1]
            }).then((res)=>{
              let ajaxData=this.options.parseAjax(res)
              this.data.splice(index,1,ajaxData);

              //存储到cache

              if(index==0){
                for(let i=0;i<ajaxData.length;i++){
                  this.cache[ajaxData[i][this.options.valueField]]={data:ajaxData[i],children:{}}
                }
              }else {
                let tempdata=this.cache;

                for(let i=0;i<index;i++){
                  tempdata=tempdata[this.select[i]].children
                }

                for(let i=0;i<ajaxData.length;i++){
                  tempdata[ajaxData[i][this.options.valueField]]={data:ajaxData[i],children:{}}
                }
              }

              if(index<this.options.length-1){
                this.init(index+1)
              }


            })
          }

        }else {
          //不请求数据
          this.select[index]=''
          if(index<this.options.length-1){
            this.init(index+1)
          }
        }


      },
      change(index){
        //后面的都要置空选项
        if(index<this.options.length-1){
          //不是最后一个选项改变了
          //后面的选项都要置空
          for(let i=index+1;i<this.options.length;i++){
            this.select.splice(i,1,'')
            this.data.splice(i,1,[])
          }
          if(this.select[index]!=''){
            //选择了某个选项,需要获取数据
            this.getData(index)

          }

        }

        this.$emit('input',this.select.join(this.options.valueSeparator))

      },
      getData(index){
        //是否有数据
        let tempdata=this.cache;
        let currentOptions=[]

        for(let i=0;i<=index;i++){
          currentOptions=tempdata[this.select[i]].data
          tempdata=tempdata[this.select[i]].children
        }

        if(JSON.stringify(tempdata) != "{}"){
          //如果cache有数据,直接从cache读取
          let res=[];
          let j=0;

          //提取出数据
          for(let key in tempdata){
            res[j++]=tempdata[key]['data'];
          }

          //将数据传下一个下拉框,后面的数据置为空
          this.data.splice(index+1,1,res)

          for(let i=index+2;i<this.options.length;i++){
            this.data.splice(i,1,[])
          }


        }else {
          //无cache数据,ajax请求

          this.$network.get(this.options.url,{
            [this.options.paramName]: currentOptions[this.options.paramField]
          }).then((res)=>{

            let ajaxData=this.options.parseAjax(res)


            for(let i=0;i<ajaxData.length;i++){
              tempdata[ajaxData[i][this.options.valueField]]={data:ajaxData[i],children:{}}
            }


            //将数据传下一个下拉框,后面的数据置为空
            this.data.splice(index+1,1,ajaxData);

            for(let i=index+2;i<this.options.length;i++){
              this.data.splice(i,1,[])
            }

          })


        }
      }
    }
  }
</script>

<style scoped lang="less">
  .cascade{
    display: flex;
    justify-content: space-between;
    select{
      margin-left: 10px;
      &:first-child{
        margin-left: 0px;
      }
    }
  }
</style>
