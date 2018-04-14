<template>
  <div class="listItem">
    <div class="wrapper" @click="onClick">
      <span class="music-name">{{music.name}}</span>
      <span class="music-singer" v-if="music.singer">{{music.singer}}</span>
    </div>
    <i class="iconfont icon-icon" @click.stop="optionsClick"></i>
  </div>
</template>

<script>
export default {
  name: 'listItem',
  props: ['music', 'type'],
  data () {
    return {}
  },
  methods: {
    optionsClick () {
      if (this.userInfo && !this.userInfo.user_id) {
        this.routerPush('account', {inlet: 'login'})
        return false
      }
      this.$store.dispatch('setOptionsData', this.music)
      this.$store.dispatch('setOptionsType', this.type)
      this.$store.dispatch('switchOptions')
    },
    onClick () {
      this.$emit('click')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./listItem.scss"
</style>
