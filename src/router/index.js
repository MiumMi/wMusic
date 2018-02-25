import Vue from 'vue'
import Router from 'vue-router'
const Tabs = () => import('@/view/tabs')
const Home = () => import('@/view/tabs/home/home')
const Search = () => import('@/view/music/search/search')

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
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
})
