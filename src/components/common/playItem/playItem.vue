<template>
  <div class="playItem">
    <div class="img-wrapper">
      <img :src="item.imgSrc" alt="">
      <span class="icon-bg"></span>
      <i :class="['icon','iconfont', {'icon-MV': item.category === 'mv', 'icon-music': item.category === 'music', 'icon-zj': item.category === 'zj'}]"></i>
      <div class="listen" v-show="item.listen">
        <i class="iconfont icon-yinle"></i>
        <span>{{item.listen}}</span>
      </div>
      <div class="user" v-show="item.userName">
        <i class="iconfont icon-avatar"></i>
        <span>{{item.userName}}</span>
        <i class="iconfont icon-star" v-show="item.vip"></i>
      </div>
    </div>
    <p class="desc">{{item.desc}}</p>
    <span class="singer" v-if="item.singer">{{item.singer}}</span>
  </div>
</template>

<script>
export default {
  name: 'playItem',
  props: ['item'],
  data () {
    return {}
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./playItem.scss"
</style>
