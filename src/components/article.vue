<template>
  <div>
    <div class="blog-post">
      <h1>{{article.title}}&nbsp;</h1>
      <div class="item-info">
        Posted by <span>{{$admin}}</span> on {{getTime(article.created_at)}} | <span>{{getCategoryName(article.category)}}</span>
      </div>
      <div class="item-content" v-html="article.text" v-highlight>{{article.text}}</div>
    </div>
    <XComment :gid="article.id"></XComment>
  </div>
</template>

<script>
  const XComment = () => import('./section/x_comment.vue')
  export default {
    name: 'varticle',
    data: function () {
      return {
        links: [],
        article: {}
      }
    },
    created: function () {
      var that = this
      this.getArticle(this.$route.params.id || 1).then(function (data) {
        if (data['code'] === 200) {
          that.article = data['data']
          document.title = that.article['title']
        } else {
          that.$alert(data['message'])
        }
      })
    },
    methods: {
      getCategoryName (category) {
        if (category) {
          return category.name
        }
      }
    },
    components: {
      XComment
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
