<template>
  <div class="home">
    <!-- swiper -->
    <swiper dots-position="center" dots-class="home-dot">
      <swiper-item v-for="(item, index) in banner" :key="index + 1">
        <img class="banner-img" :src="item.src" alt="">
        <span class="banner-desc" v-show="item.desc">{{item.desc}}</span>
      </swiper-item>
    </swiper>
    <!-- options -->
    <div class="row recommend">
      <div class="recommend-item" @click="routerPush('recommend')">
        <div class="recommend-icon">
          <span class="iconfont icon-rili"><i>12</i></span>
        </div>
        <span class="recommend-desc">每日推荐</span>
      </div>
      <div class="recommend-item" @click="routerPush('allList')">
        <div class="recommend-icon">
          <span class="iconfont icon-gedan"></span>
        </div>
        <span class="recommend-desc">歌单</span>
      </div>
      <div class="recommend-item" @click="routerPush('sort')">
        <div class="recommend-icon">
          <span class="iconfont icon-sort"></span>
        </div>
        <span class="recommend-desc">排行榜</span>
      </div>
    </div>
    <!-- wrapper -->
    <div class="wrapper">
      <div class="wrapper-item" v-for="(listItem, key) in categoryList" :key="key+1">
        <item-head :vip="listItem.title.includes('VIP') ? true : false" @click="routerPush('allList')" v-if="listItem.playlist.length > 0"><i class="iconfont icon-vip y-title" v-if="listItem.title.includes('VIP')"></i><span>{{listItem.title}}</span></item-head>
        <div class="play-list clearfix">
          <play-item v-for="(item, index) in listItem.playlist" :key="index+1" :item="item" @click.native="goOtherPage(item, listItem.title)"></play-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'vux'
import ItemHead from '@/components/common/itemHead/itemHead'
import PlayItem from '@/components/common/playItem/playItem'
import { portUrl } from '@/portUrl.js'

export default {
  name: 'home',
  components: {
    Swiper,
    SwiperItem,
    'item-head': ItemHead,
    'play-item': PlayItem
  },
  data () {
    return {
      banner: [
        {
          src: 'http://p1.music.126.net/53lkZicbDOy_6q4dkVUhUw==/109951163157792620.jpg',
          desc: '新歌首发'
        },
        {
          src: 'http://p1.music.126.net/dZRbkwupMFFrbQJOOq2lXg==/109951163156753994.jpg',
          desc: '新歌首发'
        },
        {
          src: 'http://p1.music.126.net/4hx3ckqs3fsU97-4Rv5G6Q==/109951163158048077.jpg',
          desc: '新歌首发'
        },
        {
          src: 'http://p1.music.126.net/96VhpgQonwvk0pAUgbhOuQ==/109951163159741505.jpg',
          desc: '新歌首发'
        },
        {
          src: 'http://p1.music.126.net/8UtRXjnWBO8n4XOkNZkKDg==/109951163159558790.jpg',
          desc: '新歌首发'
        }
      ],
      categoryList: [
        {
          title: '推荐歌单',
          playlist: [
          ]
        },
        {
          title: '独家放送',
          playlist: [
            // {
            //   src: 'http://p1.music.126.net/EnkfxTOuOoX1-aboycbSyQ==/109951163134383028.jpg?param=140y140',
            //   desc: '对你, 不只有" I Love You "',
            //   category: 'mv'
            // },
            // {
            //   src: 'http://p1.music.126.net/EnkfxTOuOoX1-aboycbSyQ==/109951163134383028.jpg?param=140y140',
            //   desc: '对你, ',
            //   category: 'mv'
            // },
            // {
            //   src: 'http://p1.music.126.net/EnkfxTOuOoX1-aboycbSyQ==/109951163134383028.jpg?param=140y140',
            //   desc: '只有" I Love You "',
            //   category: 'mv'
            // }
          ]
        },
        {
          title: '最新音乐',
          playlist: []
        }
      ]
    }
  },
  created () {
    this.getRecommedMusic()
    this.getNewMusic()
  },
  methods: {
    getRecommedMusic () {
      this.axios.get(portUrl.getRecommedMusic, {params: {}})
        .then((res) => {
          if (res.code === '0000') {
            const result = res.result
            result.forEach((val) => {
              val.imgSrc = this.baseImgUrl + val.src
              val.desc = val.list_name
              val.userName = val.creator
            })
            this.categoryList[0].playlist = res.result
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    getNewMusic () {
      this.axios.get(portUrl.getNewMusic, {params: {}})
        .then((res) => {
          if (res.code === '0000') {
            const result = res.result
            result.forEach((val) => {
              val.imgSrc = this.baseImgUrl + val.imgsrc
              val.desc = val.music_name
            })
            this.categoryList[2].playlist = res.result
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    goOtherPage (item, title) {
      if (title === '推荐歌单') {
        this.$store.dispatch('setListInfo', item)
        this.routerPush('musicList')
      } else if (title === '最新音乐') {
        this.playMusic(item)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "./home.scss"
</style>
