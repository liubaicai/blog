<template>
  <div class="footer-sec" style="margin-top: 0px;">
    <div class="container">
      <div class="row">
        <div class="col-md-12 foo-inner">
          &copy; {{now_year}} {{$domain}} | <span v-html="$footer">{{$footer}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'page-footer',
    data: function () {
      return {
      }
    },
    computed: {
      now_year: function () {
        var date = new Date()
        return date.getFullYear()
      }
    }
  }
</script>

<style scoped>
  .footer-sec {
    background-color:#000000;
    margin-top:50px;
  }
  .foo-inner {
    text-align:right;
    padding:20px 30px;
    color:#fff;
  }
  .copyrights{
    text-indent:-9999px;
    height:0;
    line-height:0;
    font-size:0;
    overflow:hidden;
  }
</style>
