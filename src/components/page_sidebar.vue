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
        <template v-if="authorization()">
          <li @click="toPublish()" class="list-group-item">发表</li>
          <li @click="toManager()" class="list-group-item">管理</li>
          <li @click="toLogout()" class="list-group-item">注销</li>
        </template>
        <template v-else>
          <li @click="toLogin()" class="list-group-item">登录</li>
        </template>
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
      onSearchEvent (data) {
        this.$router.push({name: 'Search', params: { s: data[0] }})
      },
      navTo (url) {
        window.open(url)
      },
      toLogin () {
        this.$router.push({name: 'Login'})
      },
      toLogout () {
        this.$cookie.delete('admin_authorization')
        this.$router.go(0)
      },
      toManager () {
        this.$router.push({name: 'Manager'})
      },
      toPublish () {
        console.log('toPublish click')
      },
      authorization () {
        if (this.$cookie.get('admin_authorization')) {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
