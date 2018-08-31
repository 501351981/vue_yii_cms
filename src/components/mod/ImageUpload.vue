<template>
  <div>
    <ul class="image-upload-view">
      <template v-for="(item,index) in images">
        <li class="item">
          <a :href="item.url" target="_blank"><img :src="item.url"></a>
          <div class="item-btn"><span class="left" v-if="index>0" @click="toleft(index)">←</span><span class="delete" @click="deleteItem(index)">删除</span><span class="right" v-if="index<images.length-1" @click="toright(index)">→</span></div>
        </li>
      </template>
      <li class="item-add" v-if="allowAdd">
        <a class="add" href="javascript:" @click="selectFile" v-if="!uploading">+</a>
        <div class="loading" v-else></div>
      </li>
    </ul>
    <div class="image-upload-file">
        <input type="file" ref="fileSelect" :accept="fileType.accept" @change="uploadImage"/>
    </div>
  </div>
</template>

<script>

  import helper from '../../utils/base/helper'
  import {upload} from '../../utils/base/upload'

  export default {
    name:'ImageUpload',
    props:{
      value:String,
      dataType:{
        type:String,
        default:'json'
      },
      numLimit:{
        type:Number,
        default:5
      },
      sizeLimit:{
        type:Number,
        default:2*1024*1024
      },
      fileType:{
        type:Object,
        default:function () {
          return {
            extensions:'jpg,jpeg,png,gif',    //允许的文件后缀
            accept:'image/jpg,image/jpeg,image/png,image/gif',//此处为了让文件选择的时候进行过滤
          }
        }
      },
      token:'',//如果七牛云直传，则设置token，否则通过服务器上传
    },
    watch:{
      value:function () {
        this.init()
      }
    },
    computed:{
      allowAdd:function () {
        return this.images.length<this.numLimit
      }
    },
    data:function(){
      return {
        images:[],
        uploading:false
      }
    },
    mounted:function () {
      this.init()
    },
    methods:{
      init:function(){
        if(!this.value){
          this.images=[]
          return
        }

        if(this.dataType=='json'){
          this.images=JSON.parse(this.value)
        }else {
          let imagesArray=this.value.split(',')
          let temp=[]
          for(let i=0;i<imagesArray.length;i++){
            temp[i]={
              uuid:helper.randomString(16),
              url:imagesArray[i]
            }
          }

          this.images=temp
        }
      },
      toleft:function (index) {
        if(index==0){
          return
        }

        let tempArray=[...this.images]
        let temp_data=tempArray[index]
        tempArray[index]=tempArray[index-1]
        tempArray[index-1]=temp_data

        this.images=tempArray
        this.emitInput()
      },
      deleteItem:function (index) {
        let tempArray=[]
        for(let i=0;i<this.images.length;i++){
          if(index!=i){
            tempArray.push(this.images[i])
          }
        }

        this.images=tempArray
        this.emitInput()
      },
      toright:function (index) {
        if(index==this.images.length-1){
          return
        }

        let tempArray=[...this.images]
        let temp_data=tempArray[index]
        tempArray[index]=tempArray[index+1]
        tempArray[index+1]=temp_data

        this.images=tempArray
        this.emitInput()
      },
      selectFile:function () {
        this.$refs.fileSelect.click()
      },
      uploadImage:function () {
        let that=this

        that.uploading=true

        upload(this.$refs.fileSelect.files[0],{
          sizeLimit:this.sizeLimit,
          extensions:this.fileType.extensions,
          token:this.token,
          success:function (url) {
            that.images.push({
              uuid:helper.randomString(16),
              url:url
            })
            that.uploading=false

            that.emitInput()

          },
          fail:function (err) {
            that.$toast({
              title:err,
              type:'error'
            })
            that.uploading=false
          }

        })

        this.$refs.fileSelect.value=''
      },
      emitInput:function () {
        if(this.dataType=='json'){
          this.$emit('input',JSON.stringify(this.images))
        }else {
          //把图片地址提取出来
          let imageUrls=[];
          for(let i=0;i<this.images.length;i++){
            imageUrls[i]=this.images[i].url
          }

          this.$emit('input',imageUrls.join(','))
        }


      }

    }
  }
</script>


<style scoped lang="less">
  @keyframes rotateZ {
    0%{
      transform: rotateZ(0);
    }
    100%{
      transform: rotateZ(360deg);
    }
  }

  .image-upload-view{
    list-style: none;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    li{
      width: 118px;
      height: 118px;
      margin-right: 22px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 0;
      display: block;
      cursor: pointer;
      position: relative;
    }
    .item-add{
      display: flex;
      justify-content: center;
      align-items: center;
      .loading{
        width: 60px;
        height: 60px;

        border-bottom: 6px solid #ccc;
        border-top: 6px solid #ccc;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-radius: 100%;
        animation: rotateZ 1s linear infinite;
        /*animation-fill-mode: both;*/
      }
      a{
        display: block;
        width: 100%;
        height: 100%;
        line-height: 118px;
        text-align: center;
        font-size: 60px;
        color: #ccc;
        text-decoration: none;
      }

      &:hover a{
        color: #666;
      }
    }
    .item{
      overflow: hidden;

      img{
        width: 100%;
        height: 100%;
      }
      .item-btn{
        position: absolute;
        left: 0;
        bottom: -30px;
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: rgba(0,0,0,0.5);
        transition: .3s;
        color: rgba(255,255,255,0.6);

        .left{
          position: absolute;
          left: 10px;
          top: 0px;
        }

        .right{
          position: absolute;
          right: 10px;
          top: 0px;
        }

      }

      &:hover .item-btn{
        bottom: 0;
      }
    }
  }

  .image-upload-file{
    display: none;
  }


</style>
