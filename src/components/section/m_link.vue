<template>
  <div>
    <div style="margin-top: 10px;">
      <button type="button" class="btn btn-success" @click.prevent="onNewLinkClick">新建</button>
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
        <td><a @click.prevent="deleteLink(index, link.id)">删除</a></td>
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
      },
      methods: {
        onNewLinkClick () {
          var that = this
          var sendData = {link: {title: '标题', url: '地址', sort: 99}, token: this.$cookie.get('admin_authorization')}
          this.toNewLink(sendData).then(function (data) {
            that.links.unshift(data['data'])
            that.links.sort(that.sortBy('sort', false))
          })
        },
        deleteLink (index, id) {
          var that = this
          that.$confirm('确定删除?')
            .then(function () {
              that.toDeleteLink(id).then(function (data) {
                if (data['code'] === 200) {
                  that.links.splice(index, 1)
                } else {
                  that.$alert(data['message'])
                }
              })
            })
            .catch(function () {
              console.log('取消')
            })
        },
        sortBy: function (attr, rev) {
          if (rev === undefined) {
            rev = 1
          } else {
            rev = (rev) ? 1 : -1
          }
          return function (a, b) {
            a = a[attr]
            b = b[attr]
            if (a < b) {
              return rev * -1
            }
            if (a > b) {
              return rev * 1
            }
            return 0
          }
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
