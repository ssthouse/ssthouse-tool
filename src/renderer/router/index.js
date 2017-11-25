import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/mainPage',
      component: require('@/components/MainPage').default
    },
    {
      path: '/musicList',
      component: require('@/components/MusicList').default
    },
    {
      path: '/setting',
      component: require('@/components/Setting').default
    },
    {
      path: '*',
      redirect: '/main-page'
    }
  ]
})
