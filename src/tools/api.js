/**
 * Created by mac on 2017/9/1.
 */

export default{
  install (Vue) {
    Vue.prototype.$host = 'http://blog.api.liubaicai.net'
    // Vue.prototype.$host = 'http://localhost:3000'
    Vue.prototype.getArticles = function (page) {
      return this.$http.get(`${this.$host}/articles?page=${page || 1}&per_page=5`)
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.getArticle = function (id) {
      return this.$http.get(`${this.$host}/articles/${id}`)
        .then(data => {
          return data
        }, response => {
          return response
        })
    }
    Vue.prototype.searchArticles = function (s) {
      return this.$http.get(`${this.$host}/articles/search?s=${s}&page=1&per_page=99999`)
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.getLinks = function () {
      return this.$http.get(`${this.$host}/links`)
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.getCategories = function () {
      return this.$http.get(`${this.$host}/categories`)
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.toNewCategory = function (sendData) {
      // sendData: {link: {title: '测试', url: 'ceshi', sort: 1}, token: Vue.cookie.get('admin_authorization')}
      return this.$http.post(`${this.$host}/categories`, sendData)
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.toEditCategory = function (id, sendData) {
      return this.$http.put(`${this.$host}/categories/${id}`, sendData)
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
  }
}
