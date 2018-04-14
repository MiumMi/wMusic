<template>
  <div class="search">
    <div class="row search-header">
      <i class="iconfont icon-fanhui" @click="goback"></i>
      <input class="search-input" type="text" placeholder="猜你喜欢 时钟" v-model="searchValue" />
    </div>
<!--     <div class="row search-category">
      <i class="iconfont icon-geshou"></i>
      <span>歌手分类</span>
      <i class="iconfont icon-right"></i>
    </div> -->
<!--     <div class="hot-search">
      <p class="hot-title">热门搜索</p>
      <ul class="hot-list clearfix">
        <li class="hot-item" v-for="(item, index) in hotList" :key="index+1">
          {{item.name}}
        </li>
      </ul>
    </div> -->
    <p class="row search-title">
      <span>搜索历史</span>
      <span class="iconfont icon-delete" @click="history.length > 0 ? show = true : ''"></span>
    </p>
    <ul class="search-history" v-if="history.length > 0">
      <li class="row search-history-item" v-for="(item, index) in history" :key="index+1" >
        <i class="iconfont icon-jil"></i>
        <div class="history-key">
          <span @click="playMusic(item)">{{item.name}}</span>
          <i class="iconfont icon-guanbi" @click="deleteHistory(index)"></i>
        </div>
      </li>
    </ul>
    <div class="nodata" v-else>暂无历史搜索</div>
    <div class="search-result" v-if="JSON.stringify(resultList) !== '{}'">
      <list-item :music="item" :type="'music'" v-for="(item, resultIndex) in resultList.musicResList" :key="resultIndex" @click="toPlay(item)"></list-item>
      <list-item :music="item" :type="'music'" v-for="(item, resultIndex) in resultList.singerResList" :key="resultIndex" @click="toPlay(item)"></list-item>
    </div>
    <confirm v-model="show" :content="'确定清空搜索记录'" on-confirm="clearHistory">
      <!-- <p style="text-align:center">{{ $t('Are you sure?') }}</p> -->
    </confirm>
  </div>
</template>

<script>
import ListItem from '@/components/common/listItem/listItem'
import { portUrl } from '@/portUrl.js'
import { Confirm } from 'vux'
import Pinyin from '@/lib/chinesePY'

export default {
  name: 'search',
  components: {
    'list-item': ListItem,
    Confirm
  },
  data () {
    return {
      searchValue: '',
      allList: [],
      hotList: [
        {
          name: '苏打绿'
        },
        {
          name: '权志龙'
        },
        {
          name: 'despacito缓缓'
        },
        {
          name: '说散就散'
        },
        {
          name: '谈判官'
        },
        {
          name: '爱乐之战'
        }
      ],
      history: [],
      resultMap: new Map(),
      show: false
    }
  },
  created () {
    this.getAllList()
  },
  methods: {
    toPlay (item) {
      let localData = window.sessionStorage.getItem('historyList')
      let exitflag = false
      let data = []
      if (localData && localData !== '') {
        data = JSON.parse(localData)
        if (localData.includes(item.m_id)) {
          exitflag = true
        }
      }
      if (!exitflag) {
        data.push(item.m_id)
      }
      window.sessionStorage.setItem('historyList', JSON.stringify(data))
      this.playMusic(item)
    },
    clearHistory () { // 清空搜索记录
      this.historyList = []
      window.sessionStorage.removeItem('historyList')
    },
    deleteHistory (index) {
      this.history.splice(index, 1)
      let localData = window.sessionStorage.getItem('historyList')
      const music = JSON.parse(localData)
      music.splice(music.length - index - 1, 1)
      window.sessionStorage.setItem('historyList', JSON.stringify(music))
    },
    getHistoryList () { // 获取搜索历史
      let localData = window.sessionStorage.getItem('historyList')
      this.history = []
      if (localData && localData !== '') {
        const music = JSON.parse(localData)
        music.forEach((val) => {
          const music = this.resultMap.get(val)
          if (music) {
            this.history.unshift(music)
          }
        })
      } else {
        this.history = []
      }
    },
    getAllList () {
      this.axios.get(portUrl.getMusicByListen, {params: {}})
        .then((res) => {
          if (res.code === '0000') {
            const result = res.result
            result.forEach((val) => {
              val.imgSrc = this.baseImgUrl + val.imgsrc
              val.name = val.music_name
              val.desc = val.singer
              val.namepy = Pinyin.get(val.name).toLowerCase()
              val.singerpy = Pinyin.get(val.singer).toLowerCase()
              this.resultMap.set(val.m_id, val)
            })
            this.allList = result
            this.getHistoryList()
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    matchResult (list, key1, key2) { // 匹配名称
      /* eslint-disable */
      let results = JSON.parse(JSON.stringify(list))
      let resultListTemp = []
      let search = this.searchValue.toLowerCase()
      /* eslint no-param-reassign: ["error", { "props": false }] */
      /* eslint-disable */
      results.forEach((item) => {
        let nameIndex = item[key1].indexOf(search)
        let pyIndex = item[key2].indexOf(String(search).toLowerCase())
        // 匹配名称
        if (nameIndex > -1) {
          resultListTemp.push(item)
        }
        // 匹配拼音
        if (pyIndex > -1) {
          if (JSON.stringify(resultListTemp).indexOf(JSON.stringify(item)) === -1) {
            resultListTemp.push(item)
          }
        }
      })
      /* eslint-enable */
      return resultListTemp
    }
  },
  computed: {
    resultList () { // 模糊搜索
      let obj = {}
      if (this.searchValue === '') {
        obj = {}
        return obj
      }
      const musicResList = this.matchResult(this.allList, 'name', 'namepy')
      const singerResList = this.matchResult(this.allList, 'singer', 'singerpy')
      obj.musicResList = musicResList
      obj.singerResList = singerResList
      console.log(obj)
      return obj
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "./search.scss"
</style>
