<template>
  <div>
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
</template>

<script>
  export default {
    data: function () {
      return {
        articles: []
      }
    },
    created: function () {
      document.title = this.$default_title
      var that = this
      this.searchArticles(this.$route.params.s || '').then(function (data) {
        if (data['code'] === 200) {
          that.articles = data['data']
        } else {
          alert(data['message'])
        }
      })
    },
    watch: {
      '$route' (to, from) {
        var that = this
        this.searchArticles(this.$route.params.s || '').then(function (data) {
          if (data['code'] === 200) {
            that.articles = data['data']
          } else {
            alert(data['message'])
          }
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
