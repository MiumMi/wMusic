<template>
  <div id="app">
    <div class="app-page">
      <router-view/>
    </div>
    <play-bar :music="music"></play-bar>
  </div>
</template>

<script>
import PlayBar from '@/components/common/playBar/playBar'

export default {
  name: 'App',
  components: {
    'play-bar': PlayBar
  },
  data () {
    return {
      music: {
        src: 'http://p1.music.126.net/EnkfxTOuOoX1-aboycbSyQ==/109951163134383028.jpg?param=140y140',
        name: '对你, ',
        singer: 'test'
      }
    }
  },
  created () {
    this.$router.push({ name: 'home' })
  }
}
</script>

<style>
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #323333;
}
</style>

<style rel="stylesheet/scss" lang="scss">
@import "./style/base.scss"
</style>
