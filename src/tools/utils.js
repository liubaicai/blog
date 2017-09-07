/**
 * Created by mac on 2017/9/1.
 */

import md5 from 'js-md5'

export default{
  install (Vue) {
    Vue.prototype.getTime = function (strTime) {
      return new Date(strTime).toDateString()
    }
    Vue.prototype.getUrlKey = function (name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || ['', ''])[1].replace(/\+/g, '%20')) || null
    }
    Vue.prototype.md5 = function (str) {
      return md5(str)
    }
    Vue.prototype.sortBy = function (attr, rev) {
      if (rev === undefined) {
        rev = 1
      } else {
        rev = (rev) ? 1 : -1
      }
      return function (a, b) {
        a = a[attr]
        b = b[attr]
        if (a < b) {
          return rev * -1
        }
        if (a > b) {
          return rev * 1
        }
        return 0
      }
    }
  }
}
