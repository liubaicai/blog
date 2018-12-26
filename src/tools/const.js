/**
 * Created by mac on 2017/9/1.
 */

export default{
  install (Vue) {
    Vue.prototype.$admin = '刘白菜'
    Vue.prototype.$default_title = '菜园子 -刘白菜的个人博客'
    Vue.prototype.$domain = 'liubaicai.net'
    Vue.prototype.$footer = 'Powerby<a href="http://weibo.com/liubaicai" target="_blank">' +
      '@刘白菜</a>，项目源码托管于<a href="https://github.com/liubaicai/baicai_vue_blog" target="_blank">GitHub</a><p>Hosted by <a href="https://pages.github.com" style="font-weight: bold">GitHub Pages</a></p>'
  }
}
