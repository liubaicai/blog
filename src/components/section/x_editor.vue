<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <input type="text" v-model="title" class="form-control" placeholder="标题">
              <select v-model="categoryId" style="margin-top: 20px;" class="form-control">
                <option v-for="category in categories" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <vue-editor id="editor" style="height: 300px;"
                          useCustomImageHandler
                          @imageAdded="handleImageAdded" v-model="content" :editorToolbar="customToolbar">
              </vue-editor>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="btn btn-danger modal-default-button" @click="onClickCancel">
                取消
              </button>
              <button class="btn btn-primary modal-default-button" @click="onClickSubmit">
                提交
              </button>
              <span style="float: left;" class="label label-danger">{{errorMessage}}</span>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { VueEditor } from 'vue2-editor'
  export default {
    props: [
      'article',
      'index'
    ],
    data () {
      return {
        categories: [],
        title: '',
        categoryId: 1,
        content: '',
        errorMessage: '',
        isEdited: false,
        customToolbar: [
          ['bold', 'italic', 'underline'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          ['code-block', 'image']
        ]
      }
    },
    created () {
      var that = this
      this.getCategories().then(function (data) {
        that.categories = data['data']
      })
    },
    mounted () {
      var that = this
      if (that.article && that.article.id >= 0) {
        this.getArticle(that.article.id).then(function (data) {
          if (data['code'] === 200) {
            that.title = data['data'].title
            that.categoryId = data['data'].category_id
            that.content = data['data'].text
          } else {
            that.$alert(data['message'])
          }
        })
      }
    },
    methods: {
      handleImageAdded: function (file, Editor, cursorLocation) {
        this.getUpToken().then(function (data) {
          var form = new FormData()
          form.append('token', data['uptoken'])
          form.append('key', `${Math.random().toString(36).substr(2)}${Math.random().toString(36).substr(2)}.jpg`)
          form.append('file', file)
          this.$http.post(`http://upload.qiniu.com/`, form)
            .then(function (resdata) {
              if (resdata.status === 200) {
                Editor.insertEmbed(cursorLocation, 'image', `http://7xpagu.com1.z0.glb.clouddn.com/${resdata.body.key}-500p`)
              }
            })
        })
      },
      onClickCancel () {
        if (this.title.length > 0 || this.content.length > 0) {
          var that = this
          that.$confirm('确定取消编辑?')
            .then(function () {
              that.$emit('close')
            })
            .catch(function () {
              console.log('取消')
            })
        } else {
          this.$emit('close')
        }
      },
      onClickSubmit () {
        var that = this
        if (that.article && that.article.id >= 0) {
          var articleEdit = {article: {id: that.article.id, title: that.title, text: that.content, category_id: that.categoryId}}
          this.toEdit(that.article.id, articleEdit).then(function (data) {
            if (data['code'] === 200) {
              that.errorMessage = ''
              that.$emit('close')
              that.$emit('update', that.index, data['data'])
            } else {
              that.errorMessage = data['message']
            }
          })
        } else {
          var articleNew = {article: {title: that.title, text: that.content, category_id: that.categoryId}}
          this.toPublish(articleNew).then(function (data) {
            if (data['code'] === 200) {
              that.errorMessage = ''
              that.$emit('close')
              that.$emit('insert', data['data'])
            } else {
              that.errorMessage = data['message']
            }
          })
        }
      }
    },
    components: {
      VueEditor
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 990;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 100%;
    max-width: 800px;
    max-height: 600px;
    margin: 0px auto;
    padding: 20px 20px 10px 20px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
  }

  .modal-header {
    border: 0px;
  }

  .modal-footer {
    border: 0px;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: -10px 0;
    height: 380px;
  }

  .modal-default-button {
    float: right;
    margin-left: 30px;
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
