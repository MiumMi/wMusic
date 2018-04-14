<template>
  <div class="itemHead">
    <div :class="['title', {'y-title': vip}]" @click="onClick"><slot></slot></div>
    <i :class="['iconfont', 'icon-right', {'y-title': vip}]" @click="onClick"></i>
  </div>
</template>

<script>
export default {
  name: 'itemHead',
  props: ['vip'],
  data () {
    return {}
  },
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./itemHead.scss"
</style>
