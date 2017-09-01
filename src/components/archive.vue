<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 ">
        <table class="table table-striped" style="margin-top: 30px;">
          <tbody><tr>
            <th>#</th>
            <th>Title</th>
          </tr>
          <tr v-for="article in articles">
            <td>{{article.id}}</td>
            <td><router-link :to="{name: 'Article', params: { id: article.id }}">{{article.title}}</router-link></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-1"></div>
      <PageSidebar class="col-md-3" style="padding-top: 30px;"></PageSidebar>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data: function () {
      return {
        articles: []
      }
    },
    created: function () {
      document.title = this.$default_title
      var that = this
      this.searchArticles(this.$route.params.s || '').then(function (data) {
        that.articles = data['data']
      })
    },
    watch: {
      '$route' (to, from) {
        var that = this
        this.searchArticles(this.$route.params.s || '').then(function (data) {
          that.articles = data['data']
        })
      }
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
