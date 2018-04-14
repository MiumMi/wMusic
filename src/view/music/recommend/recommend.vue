<template>
  <div class="recommend">
    <list-title :title="'每日推荐'"></list-title>
    <img class="bg-img" :src="baseImgUrl + 'recommend.jpg'" alt="">
    <play-title :num="musicList.length" @playAll="playAll"></play-title>
    <div class="row list-wrapper" v-for="(item, index) in musicList" :key="index+1" >
      <img class="item-img" :src="item.imgSrc" />
      <list-item :music="item" :type="'music'"></list-item>
    </div>
  </div>
</template>

<script>
import ListItem from '@/components/common/listItem/listItem'
import ListTitle from '@/components/common/listTitle/listTitle'
import PlayTitle from '@/components/common/playTitle/playTitle'
import { portUrl } from '@/portUrl.js'

export default {
  name: 'recommend',
  data () {
    return {
      musicList: []
    }
  },
  components: {
    'list-item': ListItem,
    'list-title': ListTitle,
    'play-title': PlayTitle
  },
  created () {
    this.getMusic()
  },
  methods: {
    playAll () {
      this.$store.dispatch('setPlayList', this.musicList)
      if (!this.showPlayBar) {
        this.$store.dispatch('switchPlayBar')
      }
      this.$store.dispatch('setPlayBarData', this.musicList[0])
    },
    getMusic () {
      this.axios.get(portUrl.getMusicByListen, {params: {}})
        .then((res) => {
          if (res.code === '0000') {
            const result = res.result
            result.forEach((val) => {
              val.imgSrc = this.baseImgUrl + val.imgsrc
              val.name = val.music_name
              val.desc = val.singer
            })
            this.musicList = result
          }
        }).catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "./recommend.scss"
</style>
