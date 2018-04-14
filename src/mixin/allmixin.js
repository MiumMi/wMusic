import { portUrl } from '@/portUrl.js'

export const allmixin = {
  data () {
    return {
      baseImgUrl: 'http://localhost:3000/musicImg/',
      baseMusicUrl: 'http://localhost:3000/allmusic/',
      baseLyricUrl: 'http://localhost:3000/lyric/'
    }
  },
  created () {
  },
  methods: {
    routerPush (name, params, query) {
      params = params || {}
      query = query || {}
      this.$router.push({ name, params, query })
    },
    routerReplace (name, params, query) {
      params = params || {}
      query = query || {}
      this.$router.replace({ name, params, query })
    },
    goback () {
      this.$router.go(-1)
    },
    closeOptions () {
      this.$store.dispatch('switchOptions')
    },
    playMusic (item) {
      if (!this.showPlayBar) {
        this.$store.dispatch('switchPlayBar')
      }
      item.name = item.music_name
      this.$store.dispatch('addPlayList', item)
      this.$store.dispatch('setPlayBarData', item)
      this.addLiten('music')
    },
    addLiten (type) {
      let id = ''
      let url = portUrl.addMusicListen
      if (type === 'list') {
        id = this.$store.getters.getListInfo.list_id
        url = portUrl.addListListen
      } else if (type === 'music') {
        id = this.$store.getters.getPlayBarData.m_id
      }
      const params = {
        id
      }
      this.axios.put(url, params)
        .then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
    },
    controllPlay (playcallback, pausecallback) {
      const doc = document
      const audio = doc.getElementById('audio')
      if (this.play) {
        audio.pause()
        this.$store.dispatch('switchPlay', false)
        pausecallback && pausecallback()
      } else {
        audio.play()
        this.$store.dispatch('switchPlay', true)
        playcallback && playcallback()
      }
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.getUserInfo
    },
    showPlayBar () {
      return this.$store.getters.getPlayBar
    },
    showPlayList () {
      return this.$store.getters.getPlayList
    },
    play () {
      return this.$store.getters.getPlay
    }
  }
}
