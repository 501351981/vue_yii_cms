<template>
  <layout-main>
    <router-view></router-view>
  </layout-main>
</template>

<script>
  import LayoutMain from '../../components/layout/LayoutMain'

  export default {
    name: 'Layout',
    components: {LayoutMain},
    mounted:function () {

    }
  }
</script>

<style lang="less" scoped>

</style>
