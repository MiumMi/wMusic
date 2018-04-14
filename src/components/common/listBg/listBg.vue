<template>
  <div class="listBg">
    <slot></slot>
    <div class="list-desc">
      <p>{{list.desc}}</p>
      <div class="list-creator">
        <img :src="list.avator" alt="" v-if="list.avator">
        <i class="iconfont icon-guanyanren" v-else></i>
        <span>{{list.creator}}</span>
        <i class="iconfont icon-right"></i>
      </div>
    </div>
    <div class="row list-option" v-if="list.creator !== userInfo.account">
      <div class="collect" @click="collect">
        <i class="iconfont icon-collect" v-if="!listCollect"></i>
        <i class="iconfont icon-collectsucc" v-else></i>
        <span class="list-option-desc" v-if="listCollect">已收藏</span>
        <span class="list-option-desc" v-else>收藏</span>
      </div>
      <div class="pj" @click="routerPush('comments')">
        <i class="iconfont icon-pingjia"></i>
        <span class="list-option-desc">评论</span>
      </div>
    </div>
    <div class="row list-option" v-else-if="list.list_id !== 'like'">
      <div class="download" @click="publish">
        <i class="iconfont icon-pingjia"></i>
        <span class="list-option-desc">发布歌单</span>
      </div>
    </div>
    <toast v-model="showToast" :time="1000" :type="showType">{{showText}}</toast>
  </div>
</template>

<script>
import { Toast } from 'vux'
import { portUrl } from '@/portUrl.js'

export default {
  name: 'listBg',
  props: ['list'],
  data () {
    return {
      showToast: false,
      showType: 'text',
      showText: '请先登录，再收藏该歌单',
      listCollect: false,
      collectList: [],
      index: ''
    }
  },
  components: {
    Toast
  },
  mounted () {
    if (this.list && JSON.stringify(this.userInfo) !== '{}' && this.userInfo.collect_list) {
      this.collectList = this.userInfo.collect_list.split(',')
      this.index = this.collectList.findIndex((item) => item === String(this.list.list_id))
      if (this.index !== -1) {
        this.listCollect = true
      }
    }
  },
  methods: {
    collect () {
      if (this.userInfo && !this.userInfo.user_id) {
        this.setShow('text', '请先登录，再收藏该歌曲', true)
        return
      }
      let collect = this.userInfo.collect_list
      if (this.listCollect) {
        this.collectList.splice(this.index, 1)
        collect = this.collectList.join(',')
      } else {
        if (collect) {
          collect += ',' + this.list.list_id
        } else {
          collect = this.list.list_id
        }
      }
      const params = {
        id: this.userInfo.user_id,
        collect
      }
      this.axios.put(portUrl.collect, params)
        .then((res) => {
          if (res.code === '0000') {
            if (this.listCollect) {
              this.listCollect = false
            } else {
              this.listCollect = true
            }
            this.$store.dispatch('setUserInfo', res.result)
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    publish () {
      this.$emit('publish')
    },
    setShow (type, text, show) {
      this.showText = text
      this.showType = type
      this.showToast = show
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./listBg.scss"
</style>
