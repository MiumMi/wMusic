<template>
  <div class="row tabBar">
    <div class="left">
      <i class="iconfont icon-option side-option" @click="openSlide"></i>
    </div>
    <div class="tabs">
      <i :class="['iconfont', 'icon-yinyue', {'focus': focusItem == 'mine'}]" @click="checkTab('mine')"></i>
      <i :class="['iconfont', 'icon-tuijian', {'focus': focusItem == 'home'}]" @click="checkTab('home')"></i>
      <!-- <i class="iconfont icon-usergroup"></i> -->
    </div>
    <i class="iconfont icon-search side-option" @click="routerPush('search')"></i>
  </div>
</template>

<script>
import bus from '@/lib/eventBus'
export default {
  name: 'tabBar',
  data () {
    return {
      focusItem: 'home'
    }
  },
  created () {
    bus.$on('setFocusItem', (item) => {
      this.focusItem = item
    })
  },
  methods: {
    checkTab (router) {
      this.focusItem = router
      this.routerReplace(router)
    },
    openSlide () {
      this.$store.dispatch('switchSlide')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./tabBar.scss"
</style>
