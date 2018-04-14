/**
 * Created by wwq on 2018/3/10.
 */
import * as types from './mutation-types'

// 提交一个mutation
// eslint-disable-next-line

// 弹窗控制

export const switchOptions = ({ commit }) => { // 操作弹窗
  commit(types.SWITCHOPTIONS)
}
export const setOptionsData = ({ commit }, data) => { // 弹窗数据
  commit(types.OPTIONSDATA, {data})
}
export const setOptionsType = ({ commit }, data) => { // 弹窗数据
  commit(types.SETOPTIONSTYPE, {data})
}
export const switchPlayBar = ({ commit }) => { // 操作弹窗
  commit(types.SWITCHPLAYBAR)
}
export const setPlayBarData = ({ commit }, data) => { // 弹窗数据
  commit(types.PLAYBARDATA, {data})
}
export const switchPlayList = ({ commit }) => { // 操作歌单弹窗
  commit(types.SWITCHPLAYLIST)
}
export const addPlayList = ({ commit }, data) => { // 弹窗数据
  commit(types.ADDPLAYLIST, {data})
}
export const clearPlayList = ({ commit }, data) => { // 弹窗数据
  commit(types.CLEARPLAYLIST, {data})
}
export const setPlayList = ({ commit }, data) => { // 弹窗数据
  commit(types.SETPLAYLIST, {data})
}
export const setUserInfo = ({ commit }, data) => { // 用户信息
  commit(types.USERINFO, {data})
}
export const clearUserInfo = ({ commit }) => { // 用户信息
  commit(types.CLEARUSERINFO)
}
export const switchSlide = ({ commit }) => { // 操作弹窗
  commit(types.SWITCHSLIDE)
}
export const setListInfo = ({ commit }, data) => { // 缓存歌单信息
  commit(types.LISTINFO, { data })
}
export const switchPlay = ({ commit }, data) => {
  commit(types.PLAY, { data })
}
export const switchAddList = ({ commit }) => {
  commit(types.SWITCHADDLIST)
}
export const setAddListType = ({ commit }, data) => {
  commit(types.SETADDLISTTYPE, { data })
}
export const useFocus = ({ commit }, data) => {
  commit(types.USEFOCUS, {data})
}
export const setFocusItem = ({ commit }, data) => {
  commit(types.SETFOCUS, { data })
}
