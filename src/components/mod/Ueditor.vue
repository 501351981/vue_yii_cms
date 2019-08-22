<template>
  <div class="ueditor">
    <script id="editor" type="text/plain"></script>
  </div>
</template>
<script>
  import  '../../../static/lib/ueditor/ueditor.config'
  import  '../../../static/lib/ueditor/ueditor.all.min'
  import  '../../../static/lib/ueditor/lang/zh-cn/zh-cn'
  import  '../../../static/lib/ueditor/ueditor.parse'

  export default {
    name:'Ueditor',
    data:function () {
      return{
        editor:'',
        content:''
      }
    },
    props: {
      config: {
        type: Object,
        default:function () {
          return  {
            initialFrameWidth: null,
            initialFrameHeight: 350,
            lang:"zh-cn"
          }
        }
      },
      value:String

    },
    watch:{
      value:function(new_content) {
        if(new_content!=this.content){
          this.editor.setContent(this.value);
        }
      }
    },
    mounted:function () {
      this.editor=UE.getEditor("editor",this.config)
      this.editor.addListener("ready", ()=>{
        this.editor.setContent(this.value); // 确保UE加载完成后，放入内容。

        this.editor.addListener("contentChange",()=>{
          this.content=this.editor.getContent()
          this.$emit('input', this.content)
        })
      });
    },
    methods: {
      getUEContent:function() {
        return this.editor.getContent()
      }
    },
    destroyed: function() {
      this.editor.destroy();
    },
  }
</script>
<style lang="less">

</style>
