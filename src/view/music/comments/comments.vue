<template>
  <div class="comments">
    <list-title :title="'歌单评论'"></list-title>
    <div class="row list-info">
      <img class="list-img" :src="listInfo.imgSrc" alt="">
      <div class="list-detail">
        <p class="name">{{listInfo.list_name}}</p>
        <span class="creator">{{listInfo.creator}}</span>
      </div>
    </div>
    <div class="input-wrapper">
      <input class="text-area" type="textarea" placeholder="评论限制在140个字符内" v-model="content">
      <button class="btn" @click="addComment">发表评论</button>
    </div>
    <ul class="comments-wrapper" v-if="commentsList.length > 0">
      <p class="title">全部评论（{{commentsList.length}}）</p>
      <li class="row comments-item" v-for="(item, index) in commentsList" :key="index">
        <img class="avatar" :src="item.avatar" alt="" v-if="item.avatar">
        <span class="iconfont icon-guanyanren" v-else></span>
        <div class="comments-detail">
          <div class="detail-head">
            <span class="creator">{{item.account}}</span>
            <span class="creattime">{{item.time}}</span>
          </div>
          <p>{{item.content}}</p>
        </div>
      </li>
    </ul>
    <div class="nodata" v-else>暂无评论，快来发表评论吧</div>
    <toast v-model="showToast" :time="1000" :type="type">{{text}}</toast>
  </div>
</template>

<script>
import { Toast } from 'vux'
import { portUrl } from '@/portUrl.js'
import ListTitle from '@/components/common/listTitle/listTitle'

export default {
  name: 'comments',
  components: {
    'list-title': ListTitle,
    Toast
  },
  data () {
    return {
      showToast: false,
      text: '请先登录，再评论',
      type: 'text',
      content: '',
      commentsList: []
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    getComments () {
      if (!this.listInfo.list_id) {
        return false
      }
      const params = {
        id: this.listInfo.list_id
      }
      this.axios.get(portUrl.getCommentsByList, {params})
        .then((res) => {
          if (res.code === '0000') {
            console.log(res.result)
            const result = res.result
            result.forEach((val) => {
              val.time = val.createtime.split(' ')[0]
            })
            this.commentsList = result
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    show (text, type = 'text') {
      this.showToast = true
      this.text = text
      this.type = type
    },
    addComment () {
      if (!this.userInfo || !this.userInfo.user_id) {
        this.show('请先登录，再评论')
        return false
      }
      this.content = this.content.replace(/(^\s*)|(\s*$)/g, '')
      if (!this.content) {
        this.show('评论内容不能为空')
        return false
      }
      if (this.content.length > 140) {
        this.show('评论需限制在140个字符内')
        return false
      }
      const params = {
        content: this.content,
        id: this.userInfo.user_id,
        listId: this.listInfo.list_id
      }
      this.axios.post(portUrl.addComment, params)
        .then((res) => {
          if (res.code === '0000') {
            this.content = ''
            this.show('评论成功', 'success')
            this.getComments()
          }
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    listInfo () {
      return this.$store.getters.getListInfo
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "./comments.scss"
</style>
