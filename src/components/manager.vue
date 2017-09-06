<template>
  <div style="margin-top: 30px;">
    <ul class="nav nav-tabs">
      <li role="presentation" :class="{ active: isMArticle }"><a @click="clearTab();isMArticle = true">文章管理</a></li>
      <li role="presentation" :class="{ active: isMCategory }"><a @click="clearTab();isMCategory = true">分类管理</a></li>
      <li role="presentation" :class="{ active: isMLink }"><a @click="clearTab();isMLink = true">链接管理</a></li>
      <li role="presentation" :class="{ active: isMSetting }"><a @click="clearTab();isMSetting = true">网站设置</a></li>
    </ul>
    <MArticle v-if="isMArticle"></MArticle>
    <MLink v-if="isMLink"></MLink>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          isMArticle: true,
          isMCategory: false,
          isMLink: false,
          isMSetting: false
        }
      },
      methods: {
        clearTab (tab) {
          this.isMArticle = false
          this.isMCategory = false
          this.isMLink = false
          this.isMSetting = false
        }
      }
    }
</script>

<style scoped>
  a {
    color: #999999;
  }
</style>
