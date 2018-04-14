<template>
  <div class="currentPlay">
    <list-title>
      <div class="title-detail" slot="left">
        <span class="music-name">{{playBarData.music_name}}</span>
        <span class="music-singer">{{playBarData.singer}}</span>
      </div>
    </list-title>
    <div class="content">
      <div class="img-wrapper">
        <img class="img" :style="{transform: transform}" :src="playBarData.imgSrc" alt="">
      </div>
      <div class="lyric">
        <div class="lyric-wrapper" :style="{transform: `translateY(-${translateY}px)`}">
          <span :class="['lyric-text', {'focus-lyric': focusLyric === index}]" v-for="(item, index) in lyricArr" :key="index">{{item.l}}</span>
        </div>
      </div>
      <div class="row bottom">
        <div class="row time">
          <span class="time-left">{{time}}</span>
          <div class="progress" ref="progress" id="progress" @touchend="touchend">
            <span class="now" :style="{width: width + '%'}"></span>
          </div>
          <span class="time-right">{{alltime}}</span>
        </div>
        <div class="row music-options">
          <span class="iconfont icon-shoucang" @click="collect"></span>
          <span class="iconfont icon-zuobofang" @click="pref"></span>
          <span class="iconfont icon-bofang" v-if="!play" @click="changePlay"></span>
          <span class="iconfont icon-zanting" v-else @click="changePlay"></span>
          <span class="iconfont icon-youbofang" @click="next"></span>
          <span class="iconfont icon-gedan" @click="openPlayList"></span>
        </div>
      </div>
    </div>
    <toast v-model="showToast" :time="1000" :type="showType">{{showText}}</toast>
<!--     <audio :src="baseMusicUrl + playBarData.src" autoplay="autoplay" id="audio" @ended="play = false"></audio> -->
  </div>
</template>

<script>
import ListTitle from '@/components/common/listTitle/listTitle'
import { portUrl } from '@/portUrl.js'
import { Toast } from 'vux'
export default {
  name: 'playBar',
  props: ['music'],
  components: {
    'list-title': ListTitle,
    Toast
  },
  data () {
    return {
      time: '01:00',
      alltime: '09:00',
      duration: '',
      audio: '',
      doc: '',
      timeid: null,
      width: 0,
      allWidth: 0,
      offsetLeft: 0,
      transform: '',
      deg: 0,
      rotateTime: null,
      lyricArr: [],
      revLyricArr: [],
      ricArrLen: 0,
      focusLyric: 0,
      translateY: 0,
      showToast: false,
      showText: '',
      showType: 'text',
      collectList: [],
      musicCollect: false
    }
  },
  created () {
    this.deg = 0
    if (this.showPlayBar) {
      this.$store.dispatch('switchPlayBar')
    }
    this.doc = document
    this.$nextTick(() => {
      const progress = this.doc.getElementById('progress')
      this.allWidth = progress.clientWidth
      this.offsetLeft = progress.offsetLeft
    })
    if (this.play) {
      this.rotate()
    }
  },
  beforeDestroy () {
    clearInterval(this.timeid)
    clearInterval(this.rotateTime)
    if (!this.showPlayBar) {
      this.$store.dispatch('switchPlayBar')
    }
  },
  methods: {
    formatTime (time) {
      const minute = parseInt(time / 60)
      let second = Math.round(time % 60)
      second = String(second).padStart(2, '0')
      return minute + ':' + second
    },
    getlyric (text) {
      if (text === '') {
        return
      }
      let tempLyric = text.split('\n')
      this.lyricArr = []
      tempLyric.forEach((val) => {
        if (val.includes('[')) {
          const t = val.substring(val.indexOf('[') + 1, val.indexOf(']'))
          const time = (t.split(':')[0] * 60 + parseFloat(t.split(':')[1])).toFixed(3)
          const obj = {
            t: time,
            l: val.substr(val.indexOf(']') + 1)
          }
          this.lyricArr.push(obj)
          this.revLyricArr.unshift(obj)
        }
      })
      this.ricArrLen = this.lyricArr.length
      console.log(this.lyricArr)
    },
    getNowTime () {
      this.timeid = setInterval(() => {
        const audio = this.doc.getElementById('audio')
        const currentTime = audio.currentTime
        const index = this.revLyricArr.findIndex((val) => val.t < currentTime)
        this.focusLyric = this.ricArrLen - index - 1
        this.time = this.formatTime(currentTime)
        this.width = (currentTime / this.duration) * 100
        this.$nextTick(() => {
          const focusItem = this.doc.getElementsByClassName('focus-lyric')
          console.log(focusItem)
          if (focusItem && focusItem.length > 0) {
            this.translateY = focusItem[0].offsetTop
          }
        })
      }, 1000)
    },
    rotate () {
      this.rotateTime = setInterval(() => {
        this.transform = `rotate(${this.deg}deg)`
        this.deg += 5
      }, 1000)
    },
    pauseRotate () {
      clearInterval(this.rotateTime)
    },
    touchend (e) {
      let [ touchObj ] = e.changedTouches
      const dValue = touchObj.pageX - this.offsetLeft
      this.width = (dValue / this.allWidth) * 100
      if (this.width > 100) {
        this.width = '100'
        e.preventDefault()
      } else if (this.width < 0) {
        this.width = '0'
        e.preventDefault()
      }
      const audio = this.doc.getElementById('audio')
      const currentTime = this.width / 100 * this.duration
      audio.currentTime = currentTime
      this.time = this.formatTime(currentTime)
    },
    changePlay () {
      this.controllPlay(() => {
        this.rotate()
      }, () => {
        this.pauseRotate()
      })
    },
    openPlayList () {
      this.$store.dispatch('switchPlayList')
    },
    pref () {
      let index = this.listData.findIndex(val => val.m_id === this.playBarData.m_id)
      const len = this.listData.length
      index--
      index = index < 0 ? len - 1 : index
      this.$store.dispatch('setPlayBarData', this.listData[index])
    },
    next () {
      let index = this.listData.findIndex(val => val.m_id === this.playBarData.m_id)
      const len = this.listData.length
      index++
      index = index > len - 1 ? 0 : index
      this.$store.dispatch('setPlayBarData', this.listData[index])
    },
    setShow (type, text, show) {
      this.showText = text
      this.showType = type
      this.showToast = show
    },
    collect () {
      if (this.userInfo && !this.userInfo.user_id) {
        this.setShow('text', '请先登录，再收藏该歌曲', true)
        return
      }
      const id = this.userInfo.user_id
      let collect = this.userInfo.like_music
      if (this.listCollect) {
        this.collectList.splice(this.index, 1)
        collect = this.collectList.join(',')
      } else {
        if (collect) {
          collect += ',' + this.playBarData.m_id
        } else {
          collect = this.playBarData.m_id
        }
      }
      const params = {
        collect,
        id
      }
      this.axios.put(portUrl.like, params)
        .then((res) => {
          if (res.code === '0000') {
            if (this.musicCollect) {
              this.musicCollect = false
              this.setShow('success', '取消收藏成功', true)
            } else {
              this.musicCollect = true
              this.setShow('success', '收藏成功', true)
            }
            this.$store.dispatch('setUserInfo', res.result)
          }
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    listData () {
      return this.$store.getters.getPlayListData
    },
    playBarData () {
      const playData = this.$store.getters.getPlayBarData
      const audio = this.doc.getElementById('audio')
      if (playData.src) {
        /* eslint-disable */
        this.time = this.formatTime(audio.currentTime)
        this.duration = audio.duration
        this.alltime = this.formatTime(this.duration)
        this.getNowTime()
        this.lyricArr = []
        this.revLyricArr = []
        this.getlyric(playData.lyrics)
        if (JSON.stringify(this.userInfo) !== '{}' && this.userInfo.like_music) {
          this.collectList = this.userInfo.like_music.split(',')
          this.index = this.collectList.findIndex((item) => item === String(this.playBarData.m_id))
          if (this.index !== -1) {
            this.musicCollect = true
          }
        }
      }
      return playData
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./currentPlay.scss"
</style>
