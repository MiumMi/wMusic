import Vue from 'vue'
import Router from 'vue-router'
const Tabs = () => import('@/view/tabs')
const Home = () => import('@/view/tabs/home/home')
const Mine = () => import('@/view/tabs/mine/mine')
const Search = () => import('@/view/music/search/search')
const MusicList = () => import('@/view/music/musicList/musicList')
const CurrentPlay = () => import('@/view/music/currentPlay/currentPlay')
const AllList = () => import('@/view/music/allList/allList')
const Sort = () => import('@/view/music/sort/sort')
const Recommend = () => import('@/view/music/recommend/recommend')
const Comments = () => import('@/view/music/comments/comments')
const MyComments = () => import('@/view/music/myComments/myComments')
const Account = () => import('@/view/account/Account/Account')
const AccountOptions = () => import('@/view/account/accountOptions/accountOptions')

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
      },
      {
        path: '/mine',
        name: 'mine',
        component: Mine
      }]
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/musicList',
      name: 'musicList',
      component: MusicList
    },
    {
      path: '/currentPlay',
      name: 'currentPlay',
      component: CurrentPlay
    },
    {
      path: '/account/:inlet',
      name: 'account',
      component: Account
    },
    {
      path: '/accountOptions',
      name: 'accountOptions',
      component: AccountOptions
    },
    {
      path: '/sort',
      name: 'sort',
      component: Sort
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend
    },
    {
      path: '/allList',
      name: 'allList',
      component: AllList
    },
    {
      path: 'comments',
      name: 'comments',
      component: Comments
    },
    {
      path: 'myComments',
      name: 'myComments',
      component: MyComments
    }
  ]
})
