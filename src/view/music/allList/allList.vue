<template>
  <div class="allList">
    <list-title :title="'全部歌单'"></list-title>
    <div class="row category">
      <span class="item" @click="getList()">全部</span>
      <span class="item" v-for="item in labels" :key="item.label_id" @click="getList(item)">{{item.label_name}}</span>
    </div>
    <div class="row list-wrapper" v-if="musicList.length > 0">
      <play-item v-for="(item, index) in musicList" :key="index" :item="item" @click.native="goOtherPage(item)"></play-item>
    </div>
    <div class="nodata" v-else>暂无数据</div>
  </div>
</template>

<script>
import ListTitle from '@/components/common/listTitle/listTitle'
import PlayItem from '@/components/common/playItem/playItem'
import { portUrl } from '@/portUrl.js'

export default {
  name: 'allList',
  components: {
    'list-title': ListTitle,
    'play-item': PlayItem
  },
  data () {
    return {
      musicList: [],
      labels: []
    }
  },
  created () {
    this.getAllLabel()
    this.getList()
  },
  methods: {
    getAllLabel () {
      this.axios.get(portUrl.getAllLabel, {params: {}})
        .then((res) => {
          if (res.code === '0000') {
            this.labels = res.result
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    getList (item) {
      let url = portUrl.getAllList
      let params = {}
      if (item) {
        params = {
          id: item.label_id
        }
        url = portUrl.getListByLabel
      }
      this.axios.get(url, { params })
        .then((res) => {
          if (res.code === '0000') {
            const result = res.result
            result.forEach((val) => {
              val.imgSrc = this.baseImgUrl + val.src
              val.desc = val.list_name
              val.userName = val.creator
            })
            this.musicList = res.result
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    // getListByLabel (item) {
    //   const params = {
    //     id: item.label_id
    //   }
    //   this.axios.get(portUrl.getListByLabel, {params})
    //     .then((res) => {
    //       if (res.code === '0000') {
    //         this.labels = res.result
    //       }
    //     }).catch((err) => {
    //       console.log(err)
    //     })
    // },
    goOtherPage (item) {
      this.$store.dispatch('setListInfo', item)
      this.routerPush('musicList')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "./allList.scss"
</style>
