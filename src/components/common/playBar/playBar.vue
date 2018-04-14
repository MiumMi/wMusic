<template>
  <div class="row playBar">
    <img class="playBar-img" :src="baseImgUrl+playBarData.imgsrc" alt="" @click="routerPush('')">
    <div class="playBar-desc" @click="routerPush('currentPlay')">
      <span class="music-name">{{playBarData.music_name}}</span>
      <span class="music-singer" v-if="playBarData.singer">{{playBarData.singer}}</span>
      <span class="music-singer" v-else>横滑切换下一首</span>
    </div>
    <div class="playBar-icon">
      <div class="playIcon" @click="controllPlay">
        <i class="iconfont icon-bofang" v-if="!play"></i>
        <i class="iconfont icon-zanting" v-else></i>
      </div>
      <i class="iconfont icon-gedan" @click="openPlayList"></i>
    </div>
    <!-- <audio :src="baseMusicUrl + playBarData.src" autoplay="autoplay" id="audio" @ended="play = false"></audio> -->
  </div>
</template>

<script>
export default {
  name: 'playBar',
  props: ['music'],
  data () {
    return {
    }
  },
  created () {
  },
  updated () {
    if (this.listData.length === 0 || this.playBarData.src !== this.listData[0].src) {
      this.$store.dispatch('switchPlay', true)
    }
  },
  methods: {
    openPlayList () {
      this.$store.dispatch('switchPlayList')
    }
  },
  computed: {
    listData () {
      return this.$store.getters.getPlayListData
    },
    playBarData () {
      return this.$store.getters.getPlayBarData
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./playBar.scss"
</style>
