/**
 * Created by baicai on 2017/9/11.
 */

import highlightJs from '../../lib/highlight.js'
import '../../lib/highlight.js/styles/vs.css'

export default {
  install (Vue) {
    Vue.directive('highlight', function (el) {
      let blocks = el.querySelectorAll('pre')
      for (var i = 0; i < blocks.length; i++) {
        highlightJs.highlightBlock(blocks[i])
      }
      // ie11不支持forEach
      // blocks.forEach((block) => {
      //   highlightJs.highlightBlock(block)
      // })
    })
  }
}
