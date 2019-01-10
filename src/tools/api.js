/**
 * Created by mac on 2017/9/1.
 */

export default{
  install (Vue) {
    Vue.prototype.$host = '//api.liubaicai.net'
    // Vue.prototype.$host = 'http://localhost:3000'
    Vue.prototype.getArticles = function (page) {
      return this.$http.get(`${this.$host}/blog/articles?page=${page || 1}&per_page=5`)
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.getArticle = function (id) {
      return this.$http.get(`${this.$host}/blog/articles/${id}`)
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.searchArticles = function (s) {
      return this.$http.get(`${this.$host}/blog/articles/search?s=${s}&page=1&per_page=99999`)
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.getLinks = function () {
      return this.$http.get(`${this.$host}/blog/links`)
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.getCategories = function () {
      return this.$http.get(`${this.$host}/blog/categories`)
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.toNewCategory = function (sendData) {
      // sendData: {link: {title: '测试', url: 'ceshi', sort: 1}}
      return this.$http.post(`${this.$host}/blog/categories`, sendData, {headers: {'token': Vue.cookie.get('user_token')}})
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.toEditCategory = function (id, sendData) {
      return this.$http.put(`${this.$host}/blog/categories/${id}`, sendData, {headers: {'token': Vue.cookie.get('user_token')}})
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.toDeleteCategory = function (id) {
      return this.$http.delete(`${this.$host}/blog/categories/${id}`, {headers: {'token': Vue.cookie.get('user_token')}})
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.toLogin = function (pwdMd5) {
      return this.$http.post(`${this.$host}/userLogin`, {username: 'admin', password: pwdMd5})
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.getUpToken = function () {
      return this.$http.get(`${this.$host}/blog/configs/uptoken`, {headers: {'token': Vue.cookie.get('user_token')}})
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.toPublish = function (sendData) {
      // sendData: {article: {title: '测试', text: 'ceshi', category_id: 1}}
      return this.$http.post(`${this.$host}/blog/articles`, sendData, {headers: {'token': Vue.cookie.get('user_token')}})
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.toEdit = function (id, sendData) {
      // sendData: {article: {title: '测试', text: 'ceshi', category_id: 1}}
      return this.$http.put(`${this.$host}/blog/articles/${id}`, sendData, {headers: {'token': Vue.cookie.get('user_token')}})
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.toDelete = function (id) {
      return this.$http.delete(`${this.$host}/blog/articles/${id}`, {headers: {'token': Vue.cookie.get('user_token')}})
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.toNewLink = function (sendData) {
      // sendData: {link: {title: '测试', url: 'ceshi', sort: 1}}
      return this.$http.post(`${this.$host}/blog/links`, sendData, {headers: {'token': Vue.cookie.get('user_token')}})
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.toEditLink = function (id, sendData) {
      return this.$http.put(`${this.$host}/blog/links/${id}`, sendData, {headers: {'token': Vue.cookie.get('user_token')}})
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.toDeleteLink = function (id) {
      return this.$http.delete(`${this.$host}/blog/links/${id}`, {headers: {'token': Vue.cookie.get('user_token')}})
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.getConfigs = function () {
      return this.$http.get(`${this.$host}/blog/configs`, {headers: {'token': Vue.cookie.get('user_token')}})
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
    Vue.prototype.setConfig = function (id, configValue) {
      return this.$http.put(`${this.$host}/blog/configs/${id}?config_value=${configValue}`, {headers: {'token': Vue.cookie.get('user_token')}})
        .then(function (data) {
          if (data.status === 200) {
            return data.body
          }
        })
    }
  }
}
