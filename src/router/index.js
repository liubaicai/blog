import Vue from 'vue'

import Router from 'vue-router'
Vue.use(Router)

import Index from '@/components/index'
import Article from '@/components/article'
import Archive from '@/components/archive'
import NotFound from '@/components/r_404'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/page/:page',
      name: 'Page',
      component: Index
    },
    {
      path: '/articles/:id',
      name: 'Article',
      component: Article
    },
    {
      path: '/archives',
      name: 'Archive',
      component: Archive
    },
    {
      path: '/archives/:s',
      name: 'Search',
      component: Archive
    },
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
