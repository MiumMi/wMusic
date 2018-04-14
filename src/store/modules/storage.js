/**
 * Created by SZL on 2017/10/10.
 */
import * as types from '../mutation-types'

const state = {
  options: {
    show: false,
    data: {},
    type: 'list'
  },
  playBar: {
    show: false,
    data: {}
  },
  playList: {
    show: false,
    data: []
  },
  showSlide: false,
  userInfo: {
    // avatar: 'data:image/jpeg;base64,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',
    // username: 'Mium'
  },
  listInfo: {
  },
  play: true,
  addList: {
    show: false,
    type: 'add'
  },
  routerStorage: {
    use: false,
    data: {}
  },
  focusItem: {
    use: false,
    data: ''
  }
}

/* eslint-disable */
const mutations = {
  [types.SWITCHOPTIONS] (state) {
    state.options.show = !state.options.show
  },
  [types.OPTIONSDATA] (state, { data }) {
    state.options.data = data
  },
  [types.SETOPTIONSTYPE] (state, { data }) {
    state.options.type = data
  },
  [types.SWITCHPLAYBAR] (state) {
    state.playBar.show = !state.playBar.show
  },
  [types.PLAYBARDATA] (state, { data }) {
    state.playBar.data = data
  },
  [types.SWITCHPLAYLIST] (state) {
    state.playList.show = !state.playList.show
  },
  [types.ADDPLAYLIST] (state, { data }) {
    const flag = state.playList.data.some(val => val.m_id === data.m_id)
    if (!flag) {
      state.playList.data.push(data)
    }
  },
  [types.CLEARPLAYLIST] (state) {
    state.playList.data = []
  },
  [types.SETPLAYLIST] (state, { data }) {
    state.playList.data = data
  },
  [types.USERINFO] (state, { data }) {
    state.userInfo = Object.assign({}, data)
  },
  [types.CLEARUSERINFO] (state) {
    state.userInfo = {}
  },
  [types.SWITCHSLIDE] (state) {
    state.showSlide = !state.showSlide
  },
  [types.LISTINFO] (state, { data }) {
    state.listInfo = data
  },
  [types.PLAY] (state, { data }) {
    state.play = data
  },
  [types.SWITCHADDLIST] (state) {
    state.addList.show = !state.addList.show
  },
  [types.SETADDLISTTYPE] (state, { data }) {
    state.addList.type = data
  },  
  [types.USEFOCUS] (state, { data }) {
    state.focusItem.use = data
  },
  [types.SETFOCUS] (state, { data }) {
    state.focusItem.data = data
  },
  // [types.SETADDLISTTYPE] (state, { data }) {
  //   state.addList.type = data
  // }
  // [type.]
}
/* eslint-enable */

export default {
  state,
  mutations
}
