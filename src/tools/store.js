/**
 * Created by mac on 2017/9/7.
 */

import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    links: [],
    isLogin: false,
    articles: [],
    allArticles: []
  },
  mutations: {
    updateArticles (state, articles) {
      state.articles = articles
    },
    updateAllArticles (state, articles) {
      state.allArticles = articles
    },
    updateLoginStatus (state) {
      if (Vue.cookie.get('user_token')) {
        state.isLogin = true
      } else {
        state.isLogin = false
      }
    },
    linkInit (state, links) {
      for (var i = 0; i < links.length; i++) {
        links[i].editing = false
      }
      state.links = links
      state.links.sort(Vue.prototype.sortBy('sort', false))
    },
    linkAdd (state, link) {
      link.editing = false
      state.links.unshift(link)
      state.links.sort(Vue.prototype.sortBy('sort', false))
    },
    linkRemove (state, index) {
      state.links.splice(index, 1)
    },
    linkEdit (state, data) {
      data.link.editing = false
      state.links.splice(data.index, 1, data.link)
      state.links.sort(Vue.prototype.sortBy('sort', false))
    }
  }
})
