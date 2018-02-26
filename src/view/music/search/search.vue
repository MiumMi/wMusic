<template>
  <div class="search">
    <div class="row search-header">
      <i class="iconfont icon-fanhui"></i>
      <input class="search-input" type="text" placeholder="猜你喜欢 时钟" />
    </div>
    <div class="row search-category">
      <i class="iconfont icon-geshou"></i>
      <span>歌手分类</span>
      <i class="iconfont icon-right"></i>
    </div>
    <div class="hot-search">
      <p class="hot-title">热门搜索</p>
      <ul class="hot-list clearfix">
        <li class="hot-item" v-for="(item, index) in hotList" :key="index+1">
          {{item.name}}
        </li>
      </ul>
    </div>
    <ul class="search-history">
      <li class="row search-history-item" v-for="(i, index) in 10" :key="index+1">
        <i class="iconfont icon-jil"></i>
        <div class="history-key">
          <span>马戏之王</span>
          <i class="iconfont icon-guanbi"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      hotList: [
        {
          name: '苏打绿'
        },
        {
          name: '权志龙'
        },
        {
          name: 'despacito缓缓'
        },
        {
          name: '说散就散'
        },
        {
          name: '谈判官'
        },
        {
          name: '爱乐之战'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "./search.scss"
</style>
