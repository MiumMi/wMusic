<template>
  <div class="mine">
    <div class="mine-option">
      <div class="row option-item">
        <i class="iconfont icon-yinyue"></i>
        <span class="option-desc">最近播放<i>(180首)</i></span>
      </div>
<!--       <div class="row option-item">
        <i class="iconfont icon-bofang"></i>
        <span class="option-desc">本地音乐<i>(180首)</i></span>
      </div> -->
    </div>
    <div class="music-list">
      <div class="music-list-title">
        <div class="iconfont-wrapper" @click="showList = !showList">
          <i class="iconfont icon-jiantouxia" v-if="showList"></i>
          <i class="iconfont icon-jiantoushang" v-else></i>
        </div>
        <span>我的歌单({{myList.length}})</span>
      </div>
      <div class="row list-wrapper" v-for="(item, index) in myList" :key="index+1" v-show="showList" @click="goList(item)">
        <img class="item-img" :src="item.imgSrc" />
        <list-item :music="item" :type="'like'"></list-item>
      </div>
    </div>
    <div class="music-list">
      <div class="music-list-title">
        <div class="iconfont-wrapper" @click="showList = !showList">
          <i class="iconfont icon-jiantouxia" v-if="showList"></i>
          <i class="iconfont icon-jiantoushang" v-else></i>
        </div>
        <span>我收藏的歌单({{collectList.length}})</span>
      </div>
      <div class="row list-wrapper" v-for="(item, index) in collectList" :key="index+1" v-show="showList" @click="goList(item)">
        <img class="item-img" :src="item.imgSrc" />
        <list-item :music="item" :type="'list'"></list-item>
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from '@/components/common/listItem/listItem'
import { portUrl } from '@/portUrl.js'
import bus from '@/lib/eventBus'
export default {
  name: 'mine',
  components: {
    'list-item': ListItem
  },
  data () {
    return {
      showList: true,
      likeList: [
        {
          creator: '123',
          name: '我喜欢的音乐',
          desc: '我喜欢的音乐',
          imgSrc: 'http://localhost:3000/musicImg/like.jpg',
          label_id: null,
          list_id: 'like',
          list_name: '我喜欢的音乐',
          listen: 0,
          recommend: 0,
          src: 'like.jpg',
          userName: '123'
        }
      ],
      myList: [],
      collectList: []
    }
  },
  created () {
    if (this.userInfo) {
      this.likeList[0].creator = this.userInfo.account
      this.likeList[0].userName = this.userInfo.account
    }
    this.myList = JSON.parse(JSON.stringify(this.likeList))
    this.getList()
    this.getMyList()
    bus.$on('updateList', () => {
      this.getMyList()
    })
  },
  methods: {
    getList () {
      if ((this.userInfo && !this.userInfo.user_id) || !this.userInfo.collect_list) {
        return false
      }
      const params = {
        ids: this.userInfo.collect_list
      }
      this.axios.get(portUrl.getCollectList, {params})
        .then((res) => {
          this.collectList = []
          if (res.code === '0000') {
            const result = res.result
            result.forEach((val) => {
              val.name = val.list_name
              val.imgSrc = this.baseImgUrl + val.src
            })
            this.collectList = result
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    goList (item) {
      this.$store.dispatch('useFocus', true)
      if (this.userInfo && !this.userInfo.user_id) {
        this.routerPush('account', {inlet: 'login'})
      } else {
        this.$store.dispatch('setListInfo', item)
        this.routerPush('musicList')
      }
    },
    getMyList () {
      if (this.userInfo && !this.userInfo.user_id) {
        return false
      }
      const params = {
        account: this.userInfo.account
      }
      this.axios.get(portUrl.getListByUser, {params})
        .then((res) => {
          this.myList = JSON.parse(JSON.stringify(this.likeList))
          console.log(this.myList)
          if (res.code === '0000') {
            const result = res.result
            result.forEach((val) => {
              val.name = val.list_name
              val.imgSrc = this.baseImgUrl + val.src
              this.myList.push(val)
            })
          }
        }).catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "./mine.scss"
</style>
