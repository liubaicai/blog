/**
 * Created by mac on 2017/9/1.
 */

export default{
  install (Vue) {
    Vue.prototype.getArticles = function (page) {
      return this.$http.get(`http://api.blog.liubaicai.net/articles?page=${page || 1}&per_page=5`)
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.getArticle = function (id) {
      return this.$http.get(`http://api.blog.liubaicai.net/articles/${id}`)
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.searchArticles = function (s) {
      return this.$http.get(`http://api.blog.liubaicai.net/articles/search?s=${s}&page=1&per_page=99999`)
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.getLinks = function () {
      return this.$http.get(`http://api.blog.liubaicai.net/links`)
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.getCategories = function () {
      return this.$http.get(`http://api.blog.liubaicai.net/categories`)
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.toLogin = function (pwdMd5) {
      return this.$http.get(`http://api.blog.liubaicai.net/configs/login?password=${pwdMd5}`)
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.toPublish = function (article) {
      // data: {article: {title: '测试', text: 'ceshi', category_id: 1}, token: Vue.cookie.get('admin_authorization')}
      return this.$http.post(`http://api.blog.liubaicai.net/articles`, article)
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
  }
}
