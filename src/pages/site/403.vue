<template>
 <div class="no-find">
   <h1 class="title">Forbidden(403)</h1>
   <p class="desc">您没有访问权限，请联系超级管理员或开发人员，为您添加访问权限</p>
 </div>
</template>

<script>
  export default {
    name:'Forbidden',
    mounted:function () {
    }
  }
</script>

<style scoped lang="less">
  .no-find{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: white;
    text-align: center;
    .title{
      font-size: 60px;
      font-weight: 600;
    }
    .desc{
      font-size: 24px;
      line-height: 100px;
      color: #a94442;
    }

  }
</style>
