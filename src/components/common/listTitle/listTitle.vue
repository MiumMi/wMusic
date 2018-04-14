<template>
  <div class="row listTitle">
    <i class="iconfont icon-fanhui" @click="goback"></i>
    <span class="title" v-if="title">{{title}}</span>
    <slot name="left"></slot>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'listTitle',
  props: ['title'],
  data () {
    return {}
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./listTitle.scss"
</style>
