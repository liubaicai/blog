/**
 * Created by baicai on 2017/9/11.
 */

import highlightJs from 'highlight.js'
import '../../node_modules/highlight.js/styles/vs.css'

export default {
  install (Vue) {
    Vue.directive('highlight', function (el) {
      let blocks = el.querySelectorAll('pre')
      blocks.forEach((block) => {
        highlightJs.highlightBlock(block)
      })
    })
  }
}
