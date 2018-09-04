<template>
  <layout-main>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
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
