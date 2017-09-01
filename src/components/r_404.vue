<template>
<div>
  <div class="container">
    <div class="row">
      <div class="col-md-8 ">
        <div class="mainContent" id="contentContainer">
          <div class="title" id="mainTitle">404</div>
          <ul class="tasks" id="cantDisplayTasks">
            <li>检查手机是否有wifi信号。</li>
            <li>打开浏览器,输入www.acfun.tv。</li>
            <li>随便点一个视频。</li>
            <li>看完。</li>
            <li>然后点击这个页面的猫头。</li>
            <li>没了。</li>
          </ul>
        </div>
      </div>
      <div class="col-md-1"></div>
      <PageSidebar class="col-md-3" style="padding-top: 30px;"></PageSidebar>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'NotFound'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mainContent
  {
    margin-top:80px;
  }
  .title
  {
    color: #CC6666;
    font-size: 38pt;
    vertical-align:bottom;
    margin-bottom: 20px;
    text-align: center;
  }
  .tasks
  {
    font-weight:200;
    font-size: 12pt;
    padding-top: 5px;
  }
  li
  {
    margin-top: 8px;
  }
</style>
