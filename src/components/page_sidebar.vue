<template>
  <div style="padding-top: 30px;">
    <div class="row">
      <ul class="list-group">
        <li class="list-group-item"><strong>友情链接|LINKS</strong></li>

        <li v-for="link in links" @click="navTo(link.url)" class="list-group-item">{{link.title}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'page-sidebar',
    data: function () {
      return {
        links: []
      }
    },
    created: function () {
      var that = this
      this.getLinks().then(function (data) {
        that.links = data['data']
      })
    },
    methods: {
      getLinks () {
        return this.$http.get(`http://api.blog.liubaicai.net/links`)
          .then(function (data) {
            if (data.status === 200) {
              return data.body
            }
          })
      },
      navTo (url) {
        window.open(url)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
