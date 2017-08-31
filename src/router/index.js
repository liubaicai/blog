import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Index from '@/components/index'
import Article from '@/components/article'

Vue.use(Router)
Vue.use(VueResource)

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
