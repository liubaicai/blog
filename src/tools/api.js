/**
 * Created by mac on 2017/9/1.
 */

export default{
  install (Vue) {
    Vue.prototype.$host = 'http://api.blog.liubaicai.net'
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
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
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
    Vue.prototype.toLogin = function (pwdMd5) {
      return this.$http.get(`${this.$host}/configs/login?password=${pwdMd5}`)
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.getUpToken = function () {
      return this.$http.get(`${this.$host}/configs/uptoken?token=${Vue.cookie.get('admin_authorization')}`)
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.toPublish = function (sendData) {
      // sendData: {article: {title: '测试', text: 'ceshi', category_id: 1}, token: Vue.cookie.get('admin_authorization')}
      return this.$http.post(`${this.$host}/articles`, sendData)
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.toEdit = function (id, sendData) {
      // sendData: {article: {title: '测试', text: 'ceshi', category_id: 1}, token: Vue.cookie.get('admin_authorization')}
      return this.$http.put(`${this.$host}/articles/${id}`, sendData)
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.toDelete = function (id) {
      return this.$http.delete(`${this.$host}/articles/${id}?token=${Vue.cookie.get('admin_authorization')}`)
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.toNewLink = function (sendData) {
      // sendData: {link: {title: '测试', url: 'ceshi', sort: 1}, token: Vue.cookie.get('admin_authorization')}
      return this.$http.post(`${this.$host}/links`, sendData)
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.toEditLink = function (id, sendData) {
      return this.$http.put(`${this.$host}/links/${id}`, sendData)
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.toDeleteLink = function (id) {
      return this.$http.delete(`${this.$host}/links/${id}?token=${Vue.cookie.get('admin_authorization')}`)
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
  }
}
