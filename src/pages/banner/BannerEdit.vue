<template>
  <div>
    <form class="form-horizontal form-edit">
      <input type="hidden" v-model="form.data.id"/>
      <div class="form-group">
        <div class="col-xs-6">
          <div class="form-group">
            <label class="col-xs-4 control-label"><span class="required">*</span>展示位置：</label>
            <div class="col-xs-6">
              <select class="form-control form-field" v-model="form.data.position" ref="category">
                <option value="">请选择焦点图位置</option>
                <option v-for="category in categories" :value="category.value">{{category.title}}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="col-xs-6">
          <div class="form-group">
            <label class="col-xs-4 control-label"><span class="required">*</span>排序值：</label>
            <div class="col-xs-6">
              <input class="form-control form-field" v-model="form.data.sort_order"/>
            </div>
          </div>
        </div>

      </div>
      <div class="form-group">
        <div class="col-xs-6">
          <div class="form-group">
            <label class="col-xs-4 control-label"><span class="required">*</span>展示开始日期：</label>
            <div class="col-xs-6">
              <input class="form-control form-field" type="date" v-model="form.data.valid_start_date"/>
            </div>
          </div>
        </div>

        <div class="col-xs-6">
          <div class="form-group">
            <label class="col-xs-4 control-label"><span class="required">*</span>展示结束日期：</label>
            <div class="col-xs-6">
              <input class="form-control form-field" type="date" v-model="form.data.valid_end_date"/>
            </div>
          </div>
        </div>

      </div>

      <div class="form-group">
        <label class="col-xs-2 control-label"><span class="required">*</span>图片：</label>
        <div class="col-xs-8">
          <image-upload data-type="string" :num-limit="1" :size-limit="2*1024*1024" v-model="form.data.image"></image-upload>
        </div>
      </div>

      <div class="form-group">
        <label class="col-xs-2 control-label"><span class="required">*</span>轮播链接：</label>
        <div class="col-xs-8">
          <input class="form-control form-field" v-model="form.data.link" placeholder="如无链接可输入#替代"/>
        </div>
      </div>


      <form-submit @formSubmit="formSubmit"></form-submit>
    </form>
  </div>
</template>

<script>
  import FormSubmit from "../../components/mod/FormSubmit"
  import ImageUpload from "../../components/mod/ImageUpload"

  import formValidation from '../../utils/base/formValidation'



  export default {
    name: 'BannerEdit',
    components: {ImageUpload, FormSubmit},

    data:function () {
      return {
        categories:[],
        form:{
          data:{
            id:'',
            position:'',
            sort_order:'',
            valid_start_date:'',
            valid_end_date:'',
            image:'',
            link:'',
          },
          rules:{
            position:{
              required:true
            },
            sort_order:{
              required:true
            },
            valid_start_date:{
              required:true
            },
            valid_end_date:{
              required:true
            },
            image:{
              required:true
            },
            link:{
              required:true
            },

          },
          message:{
            position:{
              required:"位置不能为空"
            },
            sort_order:{
              required:"排序值不能为空"
            },
            valid_start_date:{
              required:"开始时间不能为空"
            },
            valid_end_date:{
              required:"结束时间不能为空"
            },
            image:{
              required:"焦点图不能为空"
            },
            link:{
              required:"链接不能为空"
            },
          }
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
          link:'/banner/index',
          title:'焦点图管理'
        },
        {
          link:'',
          title:'编辑焦点图'
        },

      ]
      this.$store.commit('SET_BREADCRUMB',breadcrumb)

      let id=this.$route.query.id

      this.$network.post(this.$api.banner_detail,{
        id:id
      }).then((res)=>{
        if(id){
          this.form.data=res.detail
        }
        this.categories=res.categories


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

        this.$network.post(this.$api.banner_save,{
          ...form_data

        }).then((res)=>{
          this.$toast({
            title:"保存成功"
          })
          this.$router.push('/banner/index')
        })
      }
    }
  }
</script>

<style lang="less" scoped>


</style>
