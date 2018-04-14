<template>
  <div class="myComments">
    <list-title :title="'我的评论'"></list-title>
    <div class="list-wrapper" v-if="commentsList.length > 0">
      <div class="row list-info" v-for="(item, index) in commentsList" :key="index">
        <img class="list-img" :src="baseImgUrl + item.src" alt="">
        <div class="list-detail">
          <p class="name">歌单名：{{item.list_name}}</p>
          <span class="content">内容：{{item.content}}</span>
        </div>
        <button class="btn" @click="delComment(item, index)">删除评论</button>
      </div>
    </div>
    <div class="nodata" v-else>暂无评论，快来发表评论吧</div>
    <toast v-model="showToast" :time="1000">删除成功</toast>
  </div>
</template>

<script>
import { Toast } from 'vux'
import { portUrl } from '@/portUrl.js'
import ListTitle from '@/components/common/listTitle/listTitle'

export default {
  name: 'myComments',
  components: {
    'list-title': ListTitle,
    Toast
  },
  data () {
    return {
      showToast: false,
      commentsList: []
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    getComments () {
      if (!this.userInfo.user_id) {
        return false
      }
      const params = {
        id: this.userInfo.user_id
      }
      this.axios.get(portUrl.getCommentsByUser, {params})
        .then((res) => {
          if (res.code === '0000') {
            this.commentsList = res.result
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    delComment (item, index) {
      const params = {
        id: item.c_id
      }
      this.axios.post(portUrl.delComments, params)
        .then((res) => {
          if (res.code === '0000') {
            this.showToast = true
            this.commentsList.splice(index, 1)
          }
        }).catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "./myComments.scss"
</style>
