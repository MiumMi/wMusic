<template>
  <div class="itemHead">
    <div class="title"><slot></slot></div>
    <i class="iconfont icon-right"></i>
  </div>
</template>

<script>
export default {
  name: 'itemHead',
  data () {
    return {}
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./itemHead.scss"
</style>
