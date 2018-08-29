<template>
 <div class="no-find">
   <img src="../../assets/404.png"/>
 </div>
</template>

<script>
  export default {
    name:'NoFind',
  }
</script>

<style scoped lang="less">
  .no-find{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    img{
      width: 710px;
      height: 400px;
    }

  }
</style>
