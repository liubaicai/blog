<template>
  <div>
    <div style="margin-top: 10px;">
      <button type="button" class="btn btn-success" @click.prevent="isShowNewArticle = false">新建</button>
    </div>
    <table class="table table-striped" style="margin-top: 10px;">
      <tbody><tr>
        <th>#</th>
        <th>Title</th>
        <th></th>
        <th></th>
      </tr>
      <tr v-for="article in articles">
        <td>{{article.id}}</td>
        <td><router-link :to="{name: 'Article', params: { id: article.id }}">{{article.title}}</router-link></td>
        <td>编辑</td>
        <td>删除</td>
      </tr>
      </tbody>
    </table>
    <modal v-if="isShowNewArticle" @close="isShowNewArticle = false">
      https://cn.vuejs.org/v2/examples/modal.html
    </modal>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        articles: [],
        isShowNewArticle: true
      }
    },
    created: function () {
      document.title = this.$default_title
      var that = this
      this.searchArticles(this.$route.params.s || '').then(function (data) {
        that.articles = data['data']
      })
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
