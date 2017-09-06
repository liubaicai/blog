<template>
  <div>
    <div style="margin-top: 10px;">
      <button type="button" class="btn btn-success" @click.prevent="onNewLinkClick">新建</button>
    </div>
    <table class="table table-striped" style="margin-top: 10px;">
      <tbody>
      <tr>
        <th style="width: 10%;">#</th>
        <th style="width: 30%;">Title</th>
        <th style="width: auto;">Url</th>
        <th style="width: 15%;" colspan="2"></th>
      </tr>
      <tr v-for="(link, index) in links">
        <template v-if="link.editing === true">
          <td><input type="text" v-model="link.sort" class="form-control"></td>
          <td><input type="text" v-model="link.title" class="form-control"></td>
          <td><input type="text" v-model="link.url" class="form-control"></td>
          <td><a @click.prevent="onEditLinkSubmit(index, link)">保存</a></td>
          <td><a @click.prevent="link.editing = false">取消</a></td>
        </template>
        <template v-else>
          <td><span>{{link.sort}}</span></td>
          <td><span>{{link.title}}</span></td>
          <td><span>{{link.url}}</span></td>
          <td><a @click.prevent="link.editing = true">编辑</a></td>
          <td><a @click.prevent="onDeleteLinkClick(index, link.id)">删除</a></td>
        </template>
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
          var result = data['data']
          for (var i = 0; i < result.length; i++) {
            data['data'][i].editing = false
          }
          that.links = result
        })
      },
      methods: {
        onNewLinkClick () {
          var that = this
          var sendData = {link: {title: '标题', url: '地址', sort: 99}, token: this.$cookie.get('admin_authorization')}
          this.toNewLink(sendData).then(function (data) {
            if (data['code'] === 200) {
              var result = data['data']
              result.editing = false
              that.links.unshift(result)
              that.links.sort(that.sortBy('sort', false))
            } else {
              that.$alert(data['message'])
            }
          })
        },
        onEditLinkSubmit (index, link) {
          var that = this
          var sendData = {link: {id: link.id, title: link.title, url: link.url, sort: link.sort}, token: this.$cookie.get('admin_authorization')}
          this.toEditLink(link.id, sendData).then(function (data) {
            if (data['code'] === 200) {
              var result = data['data']
              result.editing = false
              that.links.splice(index, 1, result)
              that.links.sort(that.sortBy('sort', false))
            } else {
              that.$alert(data['message'])
            }
          })
        },
        onDeleteLinkClick (index, id) {
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
  span, a, input {
    height: 26px;
    line-height: 26px;
  }
</style>
