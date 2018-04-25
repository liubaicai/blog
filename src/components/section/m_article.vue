<template>
  <div>
    <div style="margin-top: 10px;">
      <button type="button" class="btn btn-success" @click.prevent="isShowNewArticle = true">新建</button>
    </div>
    <table class="table table-striped" style="margin-top: 10px;">
      <tbody><tr>
        <th>#</th>
        <th>Title</th>
        <th></th>
        <th></th>
      </tr>
      <tr v-for="(article, index) in articles">
        <td>{{article.id}}</td>
        <td><router-link :to="{name: 'Article', params: { id: article.id }}">{{article.title}}</router-link></td>
        <td><a @click.prevent="updateArticle(index, article)">编辑</a></td>
        <td><a @click.prevent="deleteArticle(index, article.id)">删除</a></td>
      </tr>
      </tbody>
    </table>
    <XEditor v-if="isShowNewArticle" @insert="onInsert" @close="isShowNewArticle = false">
    </XEditor>
    <XEditor v-if="isShowEditArticle" :index="editIndex" :article="editArticle" @update="onUpdate" @close="isShowEditArticle = false">
    </XEditor>
  </div>
</template>

<script>
  const XEditor = () => import('./x_editor.vue')
  export default {
    data: function () {
      return {
        isShowNewArticle: false,
        isShowEditArticle: false,
        editIndex: -1,
        editArticle: {}
      }
    },
    computed: {
      articles () {
        return this.$store.state.allArticles
      }
    },
    created: function () {
      document.title = this.$default_title
      var that = this
      this.searchArticles(this.$route.params.s || '').then(function (data) {
        if (data['code'] === 200) {
          that.$store.commit('updateAllArticles', data['data'])
        } else {
          that.$alert(data['message'])
        }
      })
    },
    methods: {
      deleteArticle (index, id) {
        var that = this
        that.$confirm('确定删除?')
          .then(function () {
            that.toDelete(id).then(function (data) {
              if (data['code'] === 200) {
                that.articles.splice(index, 1)
              } else {
                that.$alert(data['message'])
              }
            })
          })
          .catch(function () {
            console.log('取消')
          })
      },
      updateArticle (index, article) {
        this.editIndex = index
        this.editArticle = article
        this.isShowEditArticle = true
      },
      onInsert (data) {
        this.articles.unshift(data)
      },
      onUpdate (index, data) {
        this.articles.splice(index, 1, data)
      }
    },
    components: {
      XEditor
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
