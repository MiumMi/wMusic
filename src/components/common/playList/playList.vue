<template>
  <div class="playList">
    <div class="playList-bg" @click="closePlayList"></div>
    <div class="list">
      <div class="row list-title">
        <span><i class="iconfont icon-option"></i>播放列表</span>
        <span class="iconfont icon-jiantouxia" @click="closePlayList"></span>
      </div>
      <div class="row list-item-wrapper" v-for="(item, index) in listData" :key="index+1">
        <span class="index" v-if="item.m_id !== playBarData.m_id">{{index+1}}</span>
        <span class="index iconfont icon-yinyue" v-else></span>
        <list-item :class="{'focus': item.m_id === playBarData.m_id}" :music="item" :type="'music'" @click="playMusic(item)"></list-item>
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from '@/components/common/listItem/listItem'
export default {
  name: 'playList',
  components: {
    'list-item': ListItem
  },
  data () {
    return {
    }
  },
  methods: {
    closePlayList () {
      this.$store.dispatch('switchPlayList')
    }
  },
  computed: {
    listData () {
      return this.$store.getters.getPlayListData
    },
    playBarData () {
      return this.$store.getters.getPlayBarData
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./playList.scss"
</style>
