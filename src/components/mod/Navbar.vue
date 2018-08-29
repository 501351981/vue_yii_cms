<template>
  <div class="navbar">
     <div class="navbar-main">
       <div class="breadcrumb-area">
         <slot name="breadcrumb"></slot>
       </div>
       <ul class="navbar-btn-area">
         <slot name="navbar-btn-area"></slot>
       </ul>
     </div>
  </div>
</template>

<script>
  export default {
    name:'Navbar'
  }
</script>

<style lang="less" scoped>
  .navbar{
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 56px;
    background: none;

    padding-left: 210px;
    .navbar-main{
      padding-left: 10px;
      padding-right: 10px;
      height: 56px;
      background-color: white;
      box-shadow: 0 2px 2px rgba(0,0,0,.03), 0 1px 0 rgba(0,0,0,.03);
      .breadcrumb-area{
        width: 50%;
        float: left;
      }
      .navbar-btn-area{
        float: right;
        height: 56px;
        display: flex;
        justify-content: flex-end;
      }

    }
  }
</style>
