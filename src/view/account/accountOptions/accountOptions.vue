<template>
  <div class="accountOption">
    <button class="btn" @click="routerPush('account', {inlet: 'login'})">登录</button>
    <button class="btn" @click="routerPush('account', {inlet: 'regist'})">注册</button>
    <p @click="routerPush('home')">回到首页</p>
  </div>
</template>

<script>

export default {
  name: 'accountOption',
  data () {
    return {}
  },
  created () {}
}
</script>

<style rel="stylesheet/scss" lang="scss" >
@import "./accountOptions.scss"
</style>
