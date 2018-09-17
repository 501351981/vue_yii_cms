<template>
  <div>
    <form class="form-horizontal form-edit">
      <input type="hidden" v-model="form.data.id"/>


      <div class="form-group">
        <label class="col-xs-2 control-label"><span class="required">*</span>名称：</label>
        <div class="col-xs-8">
          <input class="form-control form-field" v-model="form.data.name"/>
        </div>
      </div>

      <div class="form-group">
        <label class="col-xs-2 control-label"><span class="required">*</span>简介：</label>
        <div class="col-xs-8">
          <input class="form-control form-field" v-model="form.data.desc"/>
        </div>
      </div>

      <div class="form-group">
        <label class="col-xs-2 control-label"><span class="required">*</span>封面：</label>
        <div class="col-xs-8">
          <image-upload data-type="string" :num-limit="1" :size-limit="2*1024*1024" v-model="form.data.cover"></image-upload>
          <label class="f12 lh30 info">大图片建议尺寸：900像素 * 600像素</label>
        </div>
      </div>

      <div class="form-group">
        <label class="col-xs-2 control-label"><span class="required">*</span>全屏banner：</label>
        <div class="col-xs-8">
          <image-upload data-type="string" :num-limit="1" :size-limit="2*1024*1024" v-model="form.data.banner"></image-upload>
          <label class="f12 lh30 info">大图片建议尺寸：1200像素 * 380像素</label>
        </div>
      </div>

      <template v-if="form.data.id">
        <div class="form-group">
          <label class="col-xs-2 control-label"><span class="required">*</span>资讯：</label>
          <div class="col-xs-8">
            <button-box type="add" title="添加资讯" @click="showModal"></button-box>
            <table-box ref="tableBox" :url="table.url"  :columns="table.columns" :key-name="table.keyName" >

              <tr slot="row"  slot-scope="props">
                <td class="tc">{{props.index}}</td>
                <td>{{props.item.category_text1}}</td>
                <td>{{props.item.title}}</td>
                <td class="tc">
                  <i class="fa fa-trash-o" @click="deleteItem(props.item.id)"></i>&nbsp;
                  <i class="fa fa-arrow-up" @click="upItem(props.item.id)"></i>&nbsp;
                  <i class="fa fa-arrow-down" @click="downItem(props.item.id)"></i>
                </td>
              </tr>

            </table-box>
          </div>
        </div>
      </template>

      <form-submit @formSubmit="formSubmit"></form-submit>
    </form>
    <modal @ok="addNews" ref="modal" v-if="form.data.id" :width="950">
      <div class="row h44">
        <div class="col-xs-6">
          <form @submit.prevent="queryData" class="query">
            <input type="text" v-model="query.keywords" placeholder=""  class="form-control" style="width:200px;float: left" />
            <button-box type="search" @click="queryData"></button-box>
          </form>
        </div>
      </div>

      <table-box ref="tableBoxNews" :url="table_news.url" :columns="table_news.columns" :key-name="table_news.keyName" :parse-data="table_news.parseData" :pagesize="table_news.pagesize">

        <tr slot="row"  slot-scope="props">
          <td class="tc">{{props.index}}</td>
          <td>{{props.item.category_text1}}</td>
          <td>{{props.item.title}}</td>
        </tr>


      </table-box>
    </modal>
  </div>
</template>

<script>

  import FormSubmit from "../../components/mod/FormSubmit"
  import ImageUpload from "../../components/mod/ImageUpload"
  import TableBox from '../../components/mod/TableBox'
  import ButtonBox from  '../../components/mod/ButtonBox'
  import Modal from '../../components/mod/Modal'

  import formValidation from '../../utils/base/formValidation'
  import form from '../../utils/base/form'


  export default {
    name: 'RolesEdit',
    components: {FormSubmit,ImageUpload,TableBox,ButtonBox,Modal},

    data:function () {
      return {
        query:{
          keywords:''
        },
        form:{
          data:{
            id:'',
            name:'',
            desc:'',
            cover:'',
            banner:'',
          },
          rules:{
            name:{
              required:true
            },
            desc:{
              required:true
            },
            cover:{
              required:true
            },
            banner:{
              required:true
            },
          },
          message:{
            name:{
              required:"标题不能为空"
            },
            desc:{
              required:"简介不能为空"
            },
            cover:{
              required:"封面不能为空"
            },
            banner:{
              required:"banner不能为空"
            },


          }
        },
        table:{
          url:this.$api.get_topic_news+'?topic_id='+this.$route.query.id,
          keyName:'id',
          columns:[
            {
              title:"分类",
              field:"category_text1",
              width:'80'
            },
            {
              title:"名称",
              field:"title",
              width:''
            },
            {
              title:"操作",
              field:"caozuo",
              width:'120'
            },
          ],
          parseData:function (data) {
            data.forEach(function(row){

            })
          }
        },
        table_news:{
          url:this.$api.news_index,
          pagesize:8,
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
          ],
          parseData:function (data) {
            data.forEach(function(row){

            })
          }
        },

      }
    },
    watch:{
      '$route':function (route) {
        let id=route.query.id
        this.form.data.id=id
        this.$network.post(this.$api.topic_detail,{
          id:id,
        }).then((res)=>{
          if(id){
            this.form.data=form.extend(this.form.data,res.detail)
          }


        })

        this.table.url=this.$api.get_topic_news+'?topic_id='+id


      }
    },
    mounted:function () {
      let breadcrumb=[
        {
          link: '#',
          title:'内容管理'
        },
        {
          link:'/topic/index',
          title:'专题管理'
        },
        {
          link:'',
          title:'编辑专题'
        },

      ]
      this.$store.commit('SET_BREADCRUMB',breadcrumb)

      let id=this.$route.query.id
      this.form.data.id=id
      this.$network.post(this.$api.topic_detail,{
        id:id,
      }).then((res)=>{
        if(id){
          this.form.data=form.extend(this.form.data,res.detail)
        }


      })
    },
    methods:{
      formSubmit:function () {
        let form_data={...this.form.data}

        let validation=formValidation.validate(this.form.rules,form_data,this.form.message)
        if(validation.code=='FAIL'){
          this.$toast({
            title:validation.msg,
            type:'error'
          })
          return false
        }

        this.$network.post(this.$api.topic_save,{
          ...form_data

        }).then((res)=>{
          this.$toast({
            title:"保存成功"
          })
          if(this.$route.query.id){
            this.$router.push('/topic/index')
          }else{
            this.$router.push('/topic/edit?id='+res.id)
          }

        })
      },
      deleteItem:function (id) {
        let that=this
        this.$confirm({
          content:"删除操作不能恢复，您确定要删除吗",

          success: ()=> {
            this.$network.post(this.$api.topic_news_save,{
              id:id,
              operation:'delete'

            }).then((res)=>{
              that.$refs.tableBox.refresh()
            })
          },
        })

      },
      upItem:function(id){
        let that=this
        this.$network.post(this.$api.topic_news_save,{
          id:id,
          operation:'up'

        }).then((res)=>{
          that.$refs.tableBox.refresh()
        })
      },
      downItem:function(id){
        let that=this
        this.$network.post(this.$api.topic_news_save,{
          id:id,
          operation:'down'

        }).then((res)=>{
          that.$refs.tableBox.refresh()
        })
      },
      showModal:function () {
        this.$refs.modal.show()
      },
      queryData:function () {
        let tableBox=this.$refs.tableBoxNews
        tableBox.reload({
          title:this.query.keywords
        })
      },
      addNews:function () {
        let table=this.$refs.tableBoxNews
        let id=table.getSelectedRowId()[0]
        if(!id){
          this.$refs.modal.hide()
          return
        }
        this.$network.post(this.$api.topic_news_save,{
          topic_id:this.$route.query.id,
          news_id:id
        }).then(res=>{
          this.$refs.tableBox.refresh()
        })
        this.$refs.modal.hide()
      }
    }
  }
</script>

<style lang="less" scoped>
  .fa{
    cursor: pointer;
  }


</style>
