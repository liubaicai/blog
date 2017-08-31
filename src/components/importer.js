/**
 * Created by mac on 2017/8/31.
 */

import Vue from 'vue'

import Paginate from 'vuejs-paginate'
import PageHeader from './page_header.vue'
import PageFooter from './page_footer.vue'
import PageSidebar from './page_sidebar.vue'

Vue.component('paginate', Paginate)
Vue.component('PageHeader', PageHeader)
Vue.component('PageFooter', PageFooter)
Vue.component('PageSidebar', PageSidebar)
