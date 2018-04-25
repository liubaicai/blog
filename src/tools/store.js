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
    linkInit (state, links) {
      for (var i = 0; i < links.length; i++) {
        links[i].editing = false
      }
      state.links = links
      state.links.sort(Vue.prototype.sortBy('sort', false))
    }
  }
})
