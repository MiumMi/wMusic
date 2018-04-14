<template>
  <div class="options">
    <div class="options-bg" @click="closeOptions"></div>
    <div class="options-bottom" v-if="!showList">
      <span class="option-title" v-if="optionsType === 'like' || optionsType === 'list'">
        歌单：{{optionsData.name}}
      </span>
      <div class="option-wrapper" v-if="optionsType === 'like' || optionsType === 'list'">
        <div class="row option-item" @click="delMusicList">
          <i class="iconfont icon-delete"></i>
          <span class="option-desc">删除</span>
        </div>
        <div class="row option-item" v-if="optionsType === 'like'" @click="addList('update')">
          <i class="iconfont icon-pingjia"></i>
          <span class="option-desc">修改歌单名</span>
        </div>
        <div class="row option-item" v-if="optionsType === 'like'" @click="addList('add')">
          <i class="iconfont icon-add"></i>
          <span class="option-desc">新增歌单</span>
        </div>
      </div>
      <div class="option-wrapper" v-if="optionsType === 'music'">
        <div class="row option-item">
          <i class="iconfont icon-bofang"></i>
          <span class="option-desc">立即播放</span>
        </div>
        <div class="row option-item" @click="addToList">
          <i class="iconfont icon-add"></i>
          <span class="option-desc">收藏到歌单</span>
        </div>
      </div>
    </div>
    <ul class="list-wrapper" v-if="showList">
      <p class="list-title">我的歌单</p>
      <li class="row list-item">
        <span class="num">1</span>
        <span class="desc">我喜欢的歌单</span>
      </li>
      <li class="row list-item" v-for="(item, index) in list" :key="index" @click="add(item)">
        <span class="num">{{index + 2}}</span>
        <span class="desc">{{item.list_name}}</span>
      </li>
    </ul>
    <toast v-model="showToast" :time="1000" :type="showType">{{showText}}</toast>
  </div>
</template>

<script>
import { portUrl } from '@/portUrl.js'
import { Toast } from 'vux'
import bus from '@/lib/eventBus'

export default {
  name: 'options',
  data () {
    return {
      showList: false,
      list: [],
      showToast: false,
      showType: 'success',
      showText: '收藏成功'
    }
  },
  components: {
    Toast
  },
  methods: {
    show (text, type = 'success') {
      this.showText = text
      this.showType = type
    },
    delMusicList () {
      if (this.optionsType === 'like') {
        this.delList()
      } else {
        this.delCollect()
      }
    },
    delCollect () {

    },
    delList () {
      const params = {
        id: this.$store.getters.getOptionsData.list_id
      }
      this.axios.post(portUrl.delList, params)
        .then((res) => {
          if (res.code === '0000') {
            this.$store.dispatch('switchOptions')
            bus.$emit('updateList')
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    addList (type) {
      this.$store.dispatch('switchOptions')
      this.$store.dispatch('switchAddList')
      this.$store.dispatch('setAddListType', type)
    },
    addToList () {
      const params = {
        account: this.userInfo.account
      }
      this.axios.get(portUrl.getListByUser, {params})
        .then((res) => {
          if (res.code === '0000') {
            this.showList = true
            this.list = res.result
          }
        }).catch((err) => {
          this.show('获取歌单列表失败，请稍候重试', 'cancel')
          console.log(err)
        })
      this.showList = true
    },
    add (item) {
      const data = this.$store.getters.getOptionsData
      let collect = data.musiclists
      if (collect) {
        collect += ',' + item.list_id
      } else {
        collect = item.list_id
      }
      const params = {
        id: data.m_id,
        collect
      }
      this.axios.put(portUrl.updateList, params)
        .then((res) => {
          if (res.code === '0000') {
            this.show('收藏成功')
          }
        }).catch((err) => {
          this.show('收藏失败，请稍候再试', 'cancel')
          console.log(err)
        })
    }
  },
  computed: {
    optionsData () {
      return this.$store.getters.getOptionsData
    },
    optionsType () {
      return this.$store.getters.getOptionsType
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "./options.scss"
</style>
