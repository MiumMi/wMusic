<template>
  <div class="sort">
  <list-title :title="'排行榜'"></list-title>
    <div class="row list-wrapper" v-for="(item, index) in musicList" :key="index+1" >
      <img class="item-img" :src="item.imgSrc" />
      <list-item :music="item" :type="'music'"></list-item>
    </div>
  </div>
</template>

<script>
import ListItem from '@/components/common/listItem/listItem'
import ListTitle from '@/components/common/listTitle/listTitle'
import { portUrl } from '@/portUrl.js'

export default {
  name: 'sort',
  data () {
    return {
      musicList: []
    }
  },
  components: {
    'list-item': ListItem,
    'list-title': ListTitle
  },
  created () {
    this.getMusic()
  },
  methods: {
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
@import "./sort.scss"
</style>
