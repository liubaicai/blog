<template>
  <div id="header">
    <div class="overlay">
      <div class="container">
        <div class="row">
          <div class="col-md-3 logo-div">
            <div class="logo-inner text-center">
              <div class="logo-name">
                <router-link :to="{name: 'Index'}"><img src="/static/image/sitelogo.jpg" class="img-circle" /></router-link>
              </div>
            </div>
          </div>
          <div class="col-md-9 header-text-top " id="about">
            <h1>菜园子</h1>
            刘白菜的个人博客<br />
            风恶依然清白容，霜欺雪覆倒如钟，知心解我芊芊叶，永葆玲珑为尔忠。 <br />
            <i>我一个好好的四有青年，怎么就跑来当程序员了呢？ </i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'page-header'
  }
</script>

<style scoped>
  #header {
    background: #0C739B url(/static/image/title.jpg) no-repeat center center;
    padding: 0;
    -webkit-background-size: cover;
    background-size: cover;
    -moz-background-size: cover;
    color:#E2E2E2;
  }
  #header .overlay {
    background-color:rgba(2, 2, 2, 0.56);
    padding:25px 0 30px 0;
  }
  .logo-div {
    line-height:23px;
  }

  .logo-inner {
    font-size: 30px;
    font-weight: 900;
    padding: 15px 20px 0px 20px;
    text-align: center;
    line-height: 23px;
  }

  .logo-name img {
    height:150px;
    width:150px;
  }
  .logo-inner span {
    display: block;
  }

  .logo-name a, .logo-name a:hover {
    color: rgba(147, 209, 234, 1);
    text-decoration: none;
    font-size: 16px;
  }

  .header-text-top {
    padding: 0px 30px 0px 30px;
    line-height: 30px;
  }

  .header-text-top a, .header-text-top a:hover {
    text-decoration: none;
  }
</style>
