<template>
  <div>
    <table class="table table-striped" style="margin-top: 10px;">
      <tbody>
      <tr v-for="(config, index) in configs">
        <td><span>{{config.sc_note}}</span></td>
        <td><input type="text" v-model="config.sc_value" class="form-control"></td>
        <td><a class="btn btn-default" @click.prevent="onConfigSubmit(index, config)">保存</a></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
    export default {
      data: function () {
        return {
          configs: []
        }
      },
      created: function () {
        var that = this
        this.getConfigs().then(function (data) {
          if (data['code'] === 200) {
            that.configs = data['data']
          } else {
            that.$alert(data['message'])
          }
        })
      },
      methods: {
        onConfigSubmit (index, config) {
          var that = this
          this.setConfig(config.id, config.sc_value).then(function (data) {
            that.configs.splice(index, 1, data['data'])
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
