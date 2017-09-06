<template>
  <div>
    <div style="margin-top: 10px;">
      <button type="button" class="btn btn-success">新建</button>
    </div>
    <table class="table table-striped" style="margin-top: 10px;">
      <tbody>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Url</th>
        <th colspan="2"></th>
      </tr>
      <tr v-for="(link, index) in links">
        <td>{{link.sort}}</td>
        <td>{{link.title}}</td>
        <td>{{link.url}}</td>
        <td><a>编辑</a></td>
        <td><a>删除</a></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
    export default {
      data: function () {
        return {
          links: []
        }
      },
      created: function () {
        document.title = this.$default_title
        var that = this
        this.getLinks().then(function (data) {
          that.links = data['data']
        })
      }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
