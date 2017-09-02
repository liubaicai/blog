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
  }
}
