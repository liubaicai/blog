import Vue from 'vue'

import Router from 'vue-router'
Vue.use(Router)

import Index from '@/components/index'
import Article from '@/components/article'
import Archive from '@/components/archive'
import Login from '@/components/login'
import NotFound from '@/components/r_404'

import Manager from '@/components/manager'

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
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/manager',
      name: 'Manager',
      component: Manager,
      beforeEnter: (to, from, next) => {
        if (Vue.cookie.get('user_token')) {
          next()
        } else {
          next({ name: 'Login' })
        }
      }
    },
    {
      path: '*',
      component: NotFound
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
