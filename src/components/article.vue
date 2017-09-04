<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 ">
        <div class="blog-post">
          <h1>{{article.title}}</h1>
          <div class="item-info">
            Posted by <span>{{$admin}}</span> on {{getTime(article.created_at)}}
          </div>
          <div class="item-content" v-html="article.text">{{article.text}}</div>
        </div>
        <XComment :gid="article.id"></XComment>
      </div>
      <div class="col-md-1"></div>
      <PageSidebar class="col-md-3" style="padding-top: 30px;"></PageSidebar>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'article',
    data: function () {
      return {
        links: [],
        article: {}
      }
    },
    created: function () {
      var that = this
      this.getArticle(this.$route.params.id || 1).then(function (data) {
        that.article = data['data']
        document.title = that.article['title']
      })
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
