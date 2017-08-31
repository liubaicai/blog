<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 ">
        <div id="post-container">
          <div v-for="article in articles" class="blog-post">
            <h1>{{article.title}}</h1>
            <div class="item-info">Posted by <span>{{admin}}</span> on {{getTime(article.created_at)}} </div>
            <div class="item-content" v-html="article.text">{{article.text}}</div>
            <router-link :to="{name: 'Article', params: { id: article.id }}">Read More <i class="fa fa-angle-right"></i></router-link>
          </div>
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
      <div class="col-md-1"></div>
      <PageSidebar class="col-md-3"></PageSidebar>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data: function () {
      return {
        admin: '刘白菜',
        pageNo: 0,
        pageCount: 1,
        articles: []
      }
    },
    created: function () {
      document.title = '菜园子 -刘白菜的个人博客'
      var that = this
      this.getArticles(this.$route.params.page || this.getUrlKey('page') || 1).then(function (data) {
        that.articles = data['data']
        that.pageNo = (this.$route.params.page || this.getUrlKey('page') || 1) - 1
        that.pageCount = Math.ceil((data['total']) / (data['per_page']))
      })
    },
    watch: {
      '$route' (to, from) {
        var that = this
        this.getArticles(to.params.page).then(function (data) {
          that.articles = data['data']
          that.pageNo = to.params.page - 1
          that.pageCount = Math.ceil((data['total']) / (data['per_page']))
        })
      }
    },
    methods: {
      getArticles (page) {
        return this.$http.get(`http://0.0.0.0:3000/api/articles?page=${page || 1}&per_page=5`)
          .then(function (data) {
            if (data.status === 200) {
              return data.body
            }
          })
      },
      getTime (strTime) {
        return new Date(strTime).toDateString()
      },
      getUrlKey: function (name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || ['', ''])[1].replace(/\+/g, '%20')) || null
      },
      pageNoClick: function (pageNum) {
        this.$router.push({name: 'Page', params: { page: pageNum }})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
