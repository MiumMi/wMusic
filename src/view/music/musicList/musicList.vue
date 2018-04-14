<template>
  <div class="musicList">
    <list-title :title="'歌单'"></list-title>
    <list-bg :list="listInfo" @publish="publish">
      <div class="bg-img">
        <img :src="listInfo.imgSrc" alt="">
      </div>
    </list-bg>
    <play-title :num="likeList.length" @playAll="playAll"></play-title>
    <div v-if="likeList.length > 0">
      <div class="row like-item-wrapper" v-for="(item, index) in likeList" :key="index+1" >
        <span class="index">{{index+1}}</span>
        <like-item :music="item" @click="playMusic(item)" :type="'music'"></like-item>
      </div>
    </div>
    <div class="nodata" v-else>暂无数据</div>
    <toast v-model="showToast" :time="1000" :type="showType">{{text}}</toast>
  </div>
</template>

<script>
import ListItem from '@/components/common/listItem/listItem'
import PlayTitle from '@/components/common/playTitle/playTitle'
import ListBg from '@/components/common/listBg/listBg'
import ListTitle from '@/components/common/listTitle/listTitle'
import { Toast } from 'vux'
import { portUrl } from '@/portUrl.js'

export default {
  name: 'musicList',
  components: {
    'like-item': ListItem,
    'play-title': PlayTitle,
    'list-bg': ListBg,
    'list-title': ListTitle,
    Toast
  },
  data () {
    return {
      likeList: [],
      showToast: false,
      text: '暂无可播放歌曲',
      showType: 'text'
    }
  },
  methods: {
    show (text, type = 'text') {
      this.showToast = true
      this.text = text
      this.showType = type
    },
    playAll () {
      if (this.likeList.length === 0) {
        this.show('暂无可播放歌曲')
        return
      }
      this.$store.dispatch('setPlayList', this.likeList)
      if (!this.showPlayBar) {
        this.$store.dispatch('switchPlayBar')
      }
      this.$store.dispatch('setPlayBarData', this.likeList[0])
    },
    getLikeMusics () {
      if (!this.userInfo.like_music) {
        return
      }
      const params = {
        ids: this.userInfo.like_music
      }
      this.axios.get(portUrl.getLikeMusic, {params})
        .then((res) => {
          if (res.code === '0000') {
            const result = res.result
            result.forEach((val) => {
              val.imgSrc = this.baseImgUrl + val.imgsrc
              val.name = val.music_name
              val.desc = val.singer
            })
            this.likeList = result
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    getMusics (id) {
      const params = {
        id
      }
      this.axios.get(portUrl.getMusicByList, { params })
        .then((res) => {
          if (res.code === '0000') {
            const result = res.result
            result.forEach((val) => {
              val.imgSrc = this.baseImgUrl + val.imgsrc
              val.name = val.music_name
              val.desc = val.singer
            })
            this.likeList = result
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    publish () {
      if (this.likeList.length === 0) {
        this.show('歌单内暂无歌曲，不能发布')
        return false
      }
      const params = {
        id: this.listInfo.list_id
      }
      this.axios.put(portUrl.pushList, params)
        .then((res) => {
          if (res.code === '0000') {
            this.show('发布成功', 'success')
          }
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    listInfo () {
      const info = this.$store.getters.getListInfo
      if (info.list_id && info.list_id !== 'like') {
        this.getMusics(info.list_id)
      } else if (info.list_id === 'like') {
        this.getLikeMusics()
      }
      return info
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "./musicList.scss"
</style>
