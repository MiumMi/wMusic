/**
 * Created by wwq on 2018/3/10.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import storageModel from './modules/storage'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    storageModel
  },
  strict: debug
})
