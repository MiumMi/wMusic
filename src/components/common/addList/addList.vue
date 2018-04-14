<template>
  <div class="addList">
    <div class="addList-bg" @click="closeAddList"></div>
    <div class="addList-wrapper">
      <div class="row input-item">
        <span class="input-desc">歌单名称：</span>
        <input class="item-detail" type="text" v-model="name" placeholder="限制在20个字符内">
      </div>
      <div class="row input-item" v-if="addType === 'add'">
        <span class="desc">选择标签（可多选）：</span>
        <checker class="item-detail" v-model="label" type="checkbox" default-item-class="item" selected-item-class="item-selected">
          <checker-item v-for="(item, index) in check" :key="index" :value="item.value">{{item.key}}</checker-item>
        </checker>
      </div>
      <button class="addBtn" @click="btnClick('add')" v-if="addType === 'add'">创建歌单</button>
      <button class="addBtn" @click="btnClick('update')" v-else>保存</button>
      <toast v-model="showToast" :time="1000" :type="type">{{text}}</toast>
    </div>
  </div>
</template>

<script>
import { Checker, CheckerItem, Toast } from 'vux'
import { portUrl } from '@/portUrl.js'
import bus from '@/lib/eventBus'
export default {
  name: 'addList',
  components: {
    Checker,
    CheckerItem,
    Toast
  },
  data () {
    return {
      name: '',
      label: '',
      check: [],
      showToast: false,
      text: '',
      type: 'text'
    }
  },
  created () {
    this.getAllLabel()
  },
  methods: {
    closeAddList () {
      this.$store.dispatch('switchAddList')
    },
    getAllLabel () {
      this.axios.get(portUrl.getAllLabel, {params: {}})
        .then((res) => {
          this.check = []
          if (res.code === '0000') {
            const result = res.result
            result.forEach((val) => {
              let obj = {}
              obj.key = val.label_name
              obj.value = val.label_id
              this.check.push(obj)
            })
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
    btnClick (type) {
      if (this.userInfo && !this.userInfo.account) {
        this.label = []
        this.name = ''
        this.show('请先登录')
        return false
      }
      this.name = this.name.replace(/(^\s*)|(\s*$)/g, '')
      if (!this.name) {
        this.label = []
        this.name = ''
        this.show('歌单名称不能为空')
        return false
      }
      if (this.name.length > 20) {
        this.label = []
        this.name = ''
        this.show('歌单名称需限制在20个字符内')
        return false
      }
      if (type === 'add') {
        this.addList()
      } else {
        this.updateListName()
      }
    },
    updateListName () {
      const params = {
        name: this.name,
        id: this.$store.getters.getOptionsData.list_id
      }
      this.axios.put(portUrl.updateListName, params)
        .then((res) => {
          if (res.code === '0000') {
            this.label = []
            this.name = ''
            bus.$emit('updateList')
            this.$store.dispatch('switchAddList')
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    addList () {
      const labelIds = this.label.join(',')
      const params = {
        name: this.name,
        label: labelIds,
        creator: this.userInfo.account
      }
      this.axios.post(portUrl.addList, params)
        .then((res) => {
          if (res.code === '0000') {
            this.label = []
            this.name = ''
            this.$store.dispatch('switchAddList')
            this.show('创建成功', 'success')
            bus.$emit('updateList')
          }
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    addType () {
      return this.$store.getters.getAddListType
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "./addList.scss"
</style>
