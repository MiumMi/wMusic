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
    <div class="row options">
      <div class="option-item">
        <div class="option-icon">
          <span class="iconfont icon-rili"><i>12</i></span>
        </div>
        <span class="option-desc">每日推荐</span>
      </div>
      <div class="option-item">
        <div class="option-icon">
          <span class="iconfont icon-gedan"></span>
        </div>
        <span class="option-desc">歌单</span>
      </div>
      <div class="option-item">
        <div class="option-icon">
          <span class="iconfont icon-sort"></span>
        </div>
        <span class="option-desc">排行榜</span>
      </div>
    </div>
    <!-- wrapper -->
    <div class="wrapper">
      <div class="wrapper-item">
        <item-head>推荐歌单</item-head>
        <div class="play-list clearfix">
          <play-item v-for="(item, index) in playlist" :key="index+1" :item="item"></play-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'vux'
import ItemHead from '@/components/common/itemHead/itemHead'
import PlayItem from '@/components/common/playItem/playItem'

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
      playlist: [
        {
          src: 'http://p1.music.126.net/EnkfxTOuOoX1-aboycbSyQ==/109951163134383028.jpg?param=140y140',
          desc: '对你, 不只有" I Love You "',
          listen: '16万',
          userName: '打开房间地方',
          vip: '1'
        },
        {
          src: 'http://p1.music.126.net/EnkfxTOuOoX1-aboycbSyQ==/109951163134383028.jpg?param=140y140',
          desc: '对你, ',
          listen: '16万'
        },        
        {
          src: 'http://p1.music.126.net/EnkfxTOuOoX1-aboycbSyQ==/109951163134383028.jpg?param=140y140',
          desc: '只有" I Love You "',
          listen: '16万'
        },
        {
          src: 'http://p1.music.126.net/EnkfxTOuOoX1-aboycbSyQ==/109951163134383028.jpg?param=140y140',
          desc: '对你, 不只有" I Love You "',
          listen: '16万'
        },
        {
          src: 'http://p1.music.126.net/EnkfxTOuOoX1-aboycbSyQ==/109951163134383028.jpg?param=140y140',
          desc: '对你, 不只有" I Love You "',
          listen: '16万'
        },
        {
          src: 'http://p1.music.126.net/EnkfxTOuOoX1-aboycbSyQ==/109951163134383028.jpg?param=140y140',
          desc: '对你, 不只有" I Love You "',
          listen: '16万'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "./home.scss"
</style>
