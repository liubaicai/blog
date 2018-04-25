<template>
  <div>
    <div class="row">
      <XSearch @onSearch="onSearchEvent"></XSearch>
      <ul class="list-group" style="margin-top: 20px;">
        <li class="list-group-item"><strong>友情链接|LINKS</strong></li>

        <li v-for="link in links" @click="navTo(link.url)" class="list-group-item">{{link.title}}</li>
      </ul>

      <ul class="list-group" style="margin-top: 20px;">
        <li class="list-group-item"><strong>管理|MANAGER</strong></li>
        <li @click="navTo('http://blog.api.liubaicai.net/')" class="list-group-item">仪表盘</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'page-sidebar',
    data: function () {
      return {
      }
    },
    computed: {
      links () {
        return this.$store.state.links
      }
    },
    created: function () {
      var that = this
      this.getLinks().then(function (data) {
        if (data['code'] === 200) {
          that.$store.commit('linkInit', data['data'])
        } else {
          alert(data['message'])
        }
      })
    },
    methods: {
      onSearchEvent (data) {
        this.$router.push({name: 'Search', params: { s: data[0] }})
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
