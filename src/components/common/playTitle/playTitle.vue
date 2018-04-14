<template>
  <div class="row playTitle">
    <i class="iconfont icon-bofang" @click="playAll"></i>
    <div class="play-all" @click="playAll">播放全部<span>(共{{num}}首)</span></div>
<!--     <div class="right-wrapper" @click="check">
      <i class="iconfont icon-option"></i>多选
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'playTitle',
  props: ['num'],
  data () {
    return {}
  },
  methods: {
    playAll () {
      this.$emit('playAll')
    },
    check () {
      this.$emit('check')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./playTitle.scss"
</style>
