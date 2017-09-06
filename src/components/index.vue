<template>
  <div>
    <div id="post-container">
      <transition-group name="list" tag="p">
        <div v-for="article in articles" :key="article.id" class="blog-post">
          <h1>{{article.title}}</h1>
          <div class="item-info">Posted by <span>{{$admin}}</span> on {{getTime(article.created_at)}} | <span>{{article.category.name}}</span></div>
          <div class="item-content" v-html="article.text">{{article.text}}</div>
          <router-link :to="{name: 'Article', params: { id: article.id }}">Read More <i class="fa fa-angle-right"></i></router-link>
        </div>
      </transition-group>
    </div>

    <paginate
      :page-count="pageCount"
      :force-page="pageNo"
      container-class="pagination"
      prev-text="«"
      next-text="»"
      :click-handler="pageNoClick">
    </paginate>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data: function () {
      return {
        pageNo: 0,
        pageCount: 1,
        articles: []
      }
    },
    created: function () {
      document.title = this.$default_title
      var that = this
      this.getArticles(this.$route.params.page || this.getUrlKey('page') || 1).then(function (data) {
        if (data['code'] === 200) {
          that.articles = data['data']
          that.pageNo = (this.$route.params.page || this.getUrlKey('page') || 1) - 1
          that.pageCount = Math.ceil((data['total']) / (data['per_page']))
        } else {
          that.$alert(data['message'])
        }
      })
    },
    watch: {
      '$route' (to, from) {
        var that = this
        this.getArticles(to.params.page || this.getUrlKey('page') || 1).then(function (data) {
          if (data['code'] === 200) {
            that.articles = data['data']
            that.pageNo = (to.params.page || this.getUrlKey('page') || 1) - 1
            that.pageCount = Math.ceil((data['total']) / (data['per_page']))
          } else {
            that.$alert(data['message'])
          }
        })
      }
    },
    methods: {
      pageNoClick: function (pageNum) {
        this.$router.push({name: 'Page', params: { page: pageNum }})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .list-enter-active, .list-leave-active {
    transition: all 0.2s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    /*transform: translateX(-30px);*/
  }
</style>
