<template>
  <div>
    <div style="margin-top: 10px;">
      <button type="button" class="btn btn-success" @click.prevent="onNewCategoryClick">新建</button>
    </div>
    <table class="table table-striped" style="margin-top: 10px;">
      <tbody>
      <tr>
        <th style="width: 60%;"></th>
        <th style="width: 15%;" colspan="2"></th>
      </tr>
      <tr v-for="(category, index) in categories">
        <td><input type="text" v-model="category.name" class="form-control"></td>
        <td><a class="btn btn-default" @click.prevent="onEditCategorySubmit(index, category)">保存</a></td>
        <td><a class="btn btn-default" @click.prevent="onDeleteCategoryClick(index, category.id)">删除</a></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        categories: []
      }
    },
    created: function () {
      document.title = this.$default_title
      var that = this
      this.getCategories().then(function (data) {
        if (data['code'] === 200) {
          that.categories = data['data']
        } else {
          that.$alert(data['message'])
        }
      })
    },
    methods: {
      onNewCategoryClick () {
        var that = this
        var sendData = {category: {name: '标题'}, token: this.$cookie.get('admin_authorization')}
        this.toNewCategory(sendData).then(function (data) {
          if (data['code'] === 200) {
            that.categories.push(data['data'])
          } else {
            that.$alert(data['message'])
          }
        })
      },
      onEditCategorySubmit (index, category) {
        var that = this
        var sendData = {category: {id: category.id, name: category.name}, token: this.$cookie.get('admin_authorization')}
        this.toEditCategory(category.id, sendData).then(function (data) {
          if (data['code'] === 200) {
            that.categories.splice(index, 1, data['data'])
          } else {
            that.$alert(data['message'])
          }
        })
      },
      onDeleteCategoryClick (index, id) {
        var that = this
        that.$confirm('确定删除?')
          .then(function () {
            that.toDeleteCategory(id).then(function (data) {
              if (data['code'] === 200) {
                that.categories.splice(index, 1)
              } else {
                that.$alert(data['message'])
              }
            })
          })
          .catch(function () {
            console.log('取消')
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  td span{
    line-height: 32px;
    margin: 0;
  }
</style>
