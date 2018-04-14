<template>
  <div id="app">
    <div :class="['app-page', {'pd-bottom': showPlayBar}]">
      <router-view/>
    </div>
    <play-bar :music="music" v-show="showPlayBar"></play-bar>
    <options v-show="showOptions"></options>
    <account-slide v-show="showSlide"></account-slide>
    <play-list v-show="showPlayList"></play-list>
    <audio :src="baseMusicUrl + playBarData.src" autoplay="autoplay" id="audio" @ended="ended"></audio>
    <add-list v-show="showAddList"></add-list>
  </div>
</template>

<script>
import PlayBar from '@/components/common/playBar/playBar'
import PlayList from '@/components/common/playlist/playlist'
import Options from '@/components/common/options/options'
import AccountSlide from '@/components/common/accountSlide/accountSlide'
import AddList from '@/components/common/addList/addList'
import bus from '@/lib/eventBus'

export default {
  name: 'App',
  components: {
    'play-bar': PlayBar,
    'play-list': PlayList,
    'options': Options,
    'account-slide': AccountSlide,
    'add-list': AddList
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
  },
  methods: {
    ended () {
      this.$store.dispatch('switchPlay', false)
    }
  },
  watch: {
    '$route' (val, oldval) {
      console.log(val)
      if (val.name === 'mine' || val.name === 'home') {
        console.log(val.name)
        bus.$emit('setFocusItem', val.name)
      }
    }
  },
  computed: {
    showOptions () {
      return this.$store.getters.getOptions
    },
    showSlide () {
      return this.$store.getters.getSlide
    },
    playBarData () {
      return this.$store.getters.getPlayBarData
    },
    showAddList () {
      return this.$store.getters.getAddList
    }
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
.app-page{
  height:100%;
  overflow-y: scroll;
}
</style>

<style rel="stylesheet/scss" lang="scss">
@import "./style/base.scss"
</style>
