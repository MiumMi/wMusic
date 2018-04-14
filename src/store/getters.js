/**
 * Created by SZL on 2017/10/10.
 */
// 分享弹窗
export const getOptions = state => state.storageModel.options.show

export const getOptionsData = state => state.storageModel.options.data

export const getOptionsType = state => state.storageModel.options.type

export const getPlayBar = state => state.storageModel.playBar.show

export const getPlayBarData = state => state.storageModel.playBar.data

export const getUserInfo = state => state.storageModel.userInfo

export const getSlide = state => state.storageModel.showSlide

export const getListInfo = state => state.storageModel.listInfo

export const getPlayList = state => state.storageModel.playList.show

export const getPlayListData = state => state.storageModel.playList.data

export const getPlay = state => state.storageModel.play

export const getAddList = state => state.storageModel.addList.show

export const getAddListType = state => state.storageModel.addList.type

export const getUseFocus = state => state.storageModel.focusItem.use

export const getItemFocus = state => state.storageModel.focusItem.data
