<template>
  <div id="app">
    <PageHeader></PageHeader>

    <div class="container">
      <div class="row">
        <div class="col-md-8 ">

          <router-view></router-view>

        </div>
        <div class="col-md-1"></div>
        <PageSidebar class="col-md-3" style="padding-top: 30px;"></PageSidebar>
      </div>
    </div>

    <PageFooter></PageFooter>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  body {
    font-family: Tahoma, Helvetica, Arial, "Microsoft Yahei","微软雅黑", STXihei, "华文细黑", sans-serif;
    line-height:30px;
    color:#333333;
  }
  ::-webkit-scrollbar {
    width:0px;
  }
  a,a:visited,a:hover,a:active {
    color: #CC6666;
    text-decoration: none;
  }
  .blog-post {
    padding-bottom:20px;
    border-bottom:2px solid #f4f4f4;
    padding-top:20px;
  }
  .blog-post a, .blog-post a:hover {
    font-size:16px;
  }
  .blog-post h1 {
    font-size:30px;
    line-height:1.6;
    margin-top:0;
    margin-bottom:0;
    color: #000000;
  }
  .blog-post h4 {
    font-size:20px;
    line-height:25px;
  }
  .blog-post .item-info{
    font-size: 14px;
    color: darkgray;
    margin-bottom:0;
    margin-top:0;
  }
  .blog-post .item-info span{
    /*color: #000000;*/
  }
  .blog-post .item-content {
    font-size:16px;
    line-height:24px;
    padding-bottom:8px;
    padding-top:8px;
    color: #666666;
  }
  .pagination > li > a, .pagination > li > span{
    color: #666666;
  }
  .pagination > .active > a, .pagination > .active > span, .pagination > .active > a:hover, .pagination > .active > span:hover, .pagination > .active > a:focus, .pagination > .active > span:focus{
    background-color: #666666;
    border-color: #666666;
  }
</style>
