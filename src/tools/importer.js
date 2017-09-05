/**
 * Created by mac on 2017/8/31.
 */

import Vue from 'vue'

import VueResource from 'vue-resource'
Vue.use(VueResource)

import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

import XConst from './const'
import XUtils from './utils'
import XApi from './api'
Vue.use(XConst)
Vue.use(XUtils)
Vue.use(XApi)

import Paginate from 'vuejs-paginate'
import PageHeader from '../components/section/page_header.vue'
import PageFooter from '../components/section/page_footer.vue'
import PageSidebar from '../components/section/page_sidebar.vue'
import XSearch from '../components/section/x_search.vue'
import XComment from '../components/section/x_comment.vue'

Vue.component('paginate', Paginate)
Vue.component('PageHeader', PageHeader)
Vue.component('PageFooter', PageFooter)
Vue.component('PageSidebar', PageSidebar)
Vue.component('XSearch', XSearch)
Vue.component('XComment', XComment)

import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
