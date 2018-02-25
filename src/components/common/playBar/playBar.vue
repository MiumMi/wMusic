<template>
  <div class="row playBar">
    <img class="playBar-img" :src="music.src" alt="">
    <div class="playBar-desc">
      <span class="music-name">{{music.name}}</span>
      <span class="music-singer" v-if="music.singer">{{music.singer}}</span>
      <span class="music-singer" v-else>横滑切换下一首</span>
    </div>
    <div class="playBar-icon">
      <div class="playIcon" @click="play = !play">
        <i class="iconfont icon-bofang" v-if="play"></i>
        <i class="iconfont icon-zanting" v-else></i>
      </div>
      <i class="iconfont icon-gedan"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'playBar',
  props: ['music'],
  data () {
    return {
      play: false
    }
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./playBar.scss"
</style>
