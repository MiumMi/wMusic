import Vue from 'vue'
import Router from 'vue-router'
const Tabs = () => import('@/view/tabs')
const Home = () => import('@/view/tabs/home/home')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'tabs',
      component: Tabs,
      children: [{
        path: '/home',
        name: 'home',
        component: Home
      }]
    }
  ]
})
