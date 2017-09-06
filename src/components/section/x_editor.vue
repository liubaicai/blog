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
              <Editor :content="content" @change="updateContent" :height="300" :auto-height="false"></Editor>
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
  import VueHtml5Editor from 'vue-html5-editor'
  const Editor = new VueHtml5Editor({
    // 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称
    // if set true,will append module name to toolbar after icon
    showModuleName: false,
    // 配置图片模块
    // config image module
    image: {
      // 文件最大体积，单位字节  max file size
      sizeLimit: 10 * 1024 * 1024,
      // 上传参数,默认把图片转为base64而不上传
      // upload config,default null and convert image to base64
      upload: {
        url: null,
        headers: {},
        params: {},
        fieldName: {}
      },
      // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
      // compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG)
      // set null to disable compression
      compress: {
        width: 3000,
        height: 3000,
        quality: 80
      },
      // 响应数据处理,最终返回图片链接
      // handle response data，return image url
      uploadHandler (responseText) {
        // default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
        var json = JSON.parse(responseText)
        if (!json.ok) {
          alert(json.msg)
        } else {
          return json.data
        }
      }
    },
    // 语言，内建的有英文（en-us）和中文（zh-cn）
    // default en-us, en-us and zh-cn are built-in
    language: 'zh-cn',
    // 隐藏不想要显示出来的模块
    // the modules you don't want
    hiddenModules: [
      'full-screen',
      'info'
    ],
    // 自定义要显示的模块，并控制顺序
    // keep only the modules you want and customize the order.
    // can be used with hiddenModules together
    visibleModules: [
      'text',
      'color',
      'font',
      'align',
      'list',
      'link',
      'unlink',
      'tabulation',
      'image',
      'hr',
      'eraser',
      'undo'
    ]
  })
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
        errorMessage: ''
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
      updateContent (data) {
        this.content = data
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
          var articleEdit = {article: {id: that.article.id, title: that.title, text: that.content, category_id: that.categoryId}, token: that.$cookie.get('admin_authorization')}
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
          var articleNew = {article: {title: that.title, text: that.content, category_id: that.categoryId}, token: that.$cookie.get('admin_authorization')}
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
      Editor
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
