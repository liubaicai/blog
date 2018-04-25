<template>
  <div style="margin-top: 30px;">
    <ul class="nav nav-tabs">
      <li role="presentation" :class="{ active: isMArticle }"><a @click="clearTab();isMArticle = true">文章管理</a></li>
      <li role="presentation" :class="{ active: isMCategory }"><a @click="clearTab();isMCategory = true">分类管理</a></li>
      <li role="presentation" :class="{ active: isMLink }"><a @click="clearTab();isMLink = true">链接管理</a></li>
      <li role="presentation" :class="{ active: isMConfig }"><a @click="clearTab();isMConfig = true">网站设置</a></li>
    </ul>
    <MArticle v-show="isMArticle"></MArticle>
    <MLink v-show="isMLink"></MLink>
    <MConfig v-show="isMConfig"></MConfig>
    <MCategory v-show="isMCategory"></MCategory>
  </div>
</template>

<script>
  const MArticle = () => import('./section/m_article.vue')
  const MLink = () => import('./section/m_link.vue')
  const MConfig = () => import('./section/m_config.vue')
  const MCategory = () => import('./section/m_category.vue')
  export default {
    data () {
      return {
        isMArticle: true,
        isMCategory: false,
        isMLink: false,
        isMConfig: false
      }
    },
    methods: {
      clearTab (tab) {
        this.isMArticle = false
        this.isMCategory = false
        this.isMLink = false
        this.isMConfig = false
      }
    },
    components: {
      MArticle,
      MLink,
      MConfig,
      MCategory
    }
  }
</script>

<style scoped>
  a {
    color: #999999;
  }
</style>
