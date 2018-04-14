<template>
  <div class="account">
    <list-title :title="title"></list-title>
    <div class="input-wrapper">
      <span class="err" v-if="accountMsg">{{accountMsg}}</span>
      <span class="err" v-if="pwdMsg">{{pwdMsg}}</span>
      <i class="iconfont icon-avatar"></i>
      <input type="text" placeholder="请输入账号" v-model="account">
    </div>
    <div class="input-wrapper">
      <i class="iconfont icon-suo"></i>
      <input type="text" :placeholder="placeholder" v-model="pwd">
      <span class="forget" v-if="inlet === 'login'">忘记密码?</span>
    </div>
    <button class="btn" v-if="inlet === 'login'" @click="login">登录</button>
    <button class="btn" v-else @click="regist">注册</button>
    <toast v-model="showToast" :time="1000">注册成功</toast>
  </div>
</template>

<script>
import ListTitle from '@/components/common/listTitle/listTitle'
import { portUrl } from '@/portUrl.js'
import { Alert, Toast } from 'vux'

export default {
  name: 'account',
  components: {
    'list-title': ListTitle,
    Alert,
    Toast
  },
  data () {
    return {
      inlet: '',
      title: '登录',
      placeholder: '请输入密码',
      account: '',
      pwd: '',
      accountMsg: '',
      pwdMsg: '',
      showToast: false,
      timeid: ''
    }
  },
  created () {
    this.inlet = this.$route.params.inlet
    if (this.inlet === 'login') {
      this.title = '登录'
      this.placeholder = '请输入密码'
    } else if (this.inlet === 'regist') {
      this.title = '注册'
      this.placeholder = '请设置密码'
    }
  },
  beforeDestory () {
    clearTimeout(this.timeid)
  },
  methods: {
    regist () {
      const params = {
        account: this.account,
        password: this.pwd
      }
      this.axios.post(portUrl.regist, params)
        .then((res) => {
          if (res.code === '0000') {
            this.showToast = true
            this.login()
          } else {
            this.accountMsg = res.msg
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    login () {
      const params = {
        account: this.account,
        password: this.pwd
      }
      this.axios.post(portUrl.login, params)
        .then((res) => {
          if (res.code === '0000') {
            const data = res.result
            this.$store.dispatch('setUserInfo', data)
            this.routerPush('home')
          } else {
            this.pwdMsg = res.msg
          }
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  watch: {
    account (val, oldval) {
      if (val !== oldval) {
        this.accountMsg = ''
        this.pwdMsg = ''
      }
    },
    pwd (val, oldval) {
      if (val !== oldval) {
        this.accountMsg = ''
        this.pwdMsg = ''
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "./account.scss"
</style>
