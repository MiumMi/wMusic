<template>
  <div class="itemHead">
    <div :class="['title', {'y-title': vip}]"><slot></slot></div>
    <i :class="['iconfont', 'icon-right', {'y-title': vip}]"></i>
  </div>
</template>

<script>
export default {
  name: 'itemHead',
  props: ['vip'],
  data () {
    return {}
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./itemHead.scss"
</style>
