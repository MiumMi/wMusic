// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
// axios异步请求
import { axiosDefault } from './vueoperate/axiosDefault'
import { axiosHTTPConfig, axiosHTTPError, axiosResConfig, axiosResError } from './vueoperate/axiosHTTPInterceptoers'
import { allmixin } from './mixin/allmixin'
Vue.mixin(allmixin)

Vue.config.productionTip = false

const instance = axios.create(axiosDefault)
instance.interceptors.request.use(axiosHTTPConfig, axiosHTTPError)
instance.interceptors.response.use(axiosResConfig, axiosResError)
Vue.use(VueAxios, instance)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
