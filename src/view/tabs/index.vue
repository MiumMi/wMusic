<template>
  <div class="tab-page">
    <v-tabbar></v-tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Tabbar from '@/components/common/tabBar/tabBar'

export default {
  components: {
    'v-tabbar': Tabbar
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
