<template>
  <div class="accountSlide">
    <div class="account-bg" @click="closeSlide"></div>
    <div class="account-wrapper">
      <div class="account-detail">
        <input class="input-loc-img" name="imgLocal" ref="imgLocal" type='file' accept="image/*" @change="selectImg" v-if="userInfo && userInfo.user_id" />
        <img class="avatar" :src="userInfo.avatar" alt="" v-if="userInfo.avatar">
        <span class="iconfont icon-guanyanren" v-else></span>
        <span class="username" v-if="userInfo.user_id">{{userInfo.account}}</span>
        <span class="username" v-else>未登录</span>
      </div>
      <div class="user-options">
        <div class="item" @click="goOtherPage">
          <i class="iconfont icon-xiaoxi"></i>
          <span>我的评论</span>
        </div>
<!--         <div class="item">
          <i class="iconfont icon-collect"></i>
          <span>我的歌单</span>
        </div> -->
      </div>
      <div class="row operation">
        <span @click="changeAccount"><i class="iconfont icon-shezhi"></i>{{userInfo.user_id ? '切换账号' : '登录'}}</span>
        <span @click="loginout" v-if="userInfo.user_id"><i class="iconfont icon-tuichu"></i>退出登录</span>
      </div>
    </div>
  </div>
</template>

<script>
import { portUrl } from '@/portUrl.js'

export default {
  name: 'account',
  data () {
    return {}
  },
  created () {},
  methods: {
    goOtherPage () {
      this.closeSlide()
      if (this.userInfo && !this.userInfo.user_id) {
        this.routerPush('account', {inlet: 'login'})
        return false
      }
      this.routerPush('myComments')
    },
    closeSlide () {
      this.$store.dispatch('switchSlide')
    },
    changeAccount () {
      this.$store.dispatch('clearUserInfo')
      this.$store.dispatch('switchSlide')
      this.routerPush('accountOptions')
    },
    loginout () {
      this.$store.dispatch('clearUserInfo')
      this.$store.dispatch('switchSlide')
    },
    selectImg () {
      if (this.userInfo && !this.userInfo.user_id) {
        return false
      }
      const imgFile = this.$refs.imgLocal.files[0]
      if (imgFile) {
        const pointAt = imgFile.name.lastIndexOf('.')
        const suffix = imgFile.name.substr(pointAt + 1)
        const data = {
          id: this.userInfo.user_id,
          suffix: suffix
        }
        let formdata = new FormData()
        Object.keys(data).map(key => {
          formdata.append(key, data[key])
        })
        formdata.append('file', imgFile)
        window.sessionStorage.setItem('isImg', '1')
        const params = formdata
        this.axios.post(portUrl.uploadImg, params)
          .then((res) => {
            if (res.code === '0000') {
            }
          }).catch((err) => {
            console.log(err)
          })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "./accountSlide.scss"
</style>
