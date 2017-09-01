<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <div class="form-box" style="max-width: 500px;">
          <div class="form-top">
            <div class="form-top-left">
              <h3>Login to site</h3>
              <p>Enter your username and password to log on:</p>
            </div>
            <div class="form-top-right">
              <i class="fa fa-lock"></i>
            </div>
          </div>
          <div class="form-bottom">
            <form role="form" action="" method="post" class="login-form">
              <div class="form-group">
                <label class="sr-only" for="form-username">Username</label>
                <input type="text" name="form-username" placeholder="Username..." class="form-username form-control" id="form-username">
              </div>
              <div class="form-group">
                <label class="sr-only" for="form-password">Password</label>
                <input type="password" name="form-password" placeholder="Password..." class="form-password form-control" id="form-password">
              </div>
              <button type="submit" class="btn">Sign in!</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-1"></div>
      <PageSidebar class="col-md-3" style="padding-top: 30px;"></PageSidebar>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login'
  }
</script>

<style scoped>

  strong { font-weight: 500; }

  a, a:hover, a:focus {
    color: #de615e;
    text-decoration: none;
    -o-transition: all .3s; -moz-transition: all .3s; -webkit-transition: all .3s; -ms-transition: all .3s; transition: all .3s;
  }

  h1, h2 {
    margin-top: 10px;
    font-size: 38px;
    font-weight: 100;
    color: #555;
    line-height: 50px;
  }

  h3 {
    font-size: 22px;
    font-weight: 300;
    color: #555;
    line-height: 30px;
  }

  img { max-width: 100%; }

  ::-moz-selection { background: #de615e; color: #fff; text-shadow: none; }
  ::selection { background: #de615e; color: #fff; text-shadow: none; }

  .btn-link-1 i {
    padding-right: 5px;
    vertical-align: middle;
    font-size: 20px;
    line-height: 20px;
  }

  .top-content .text {
    color: #fff;
  }

  .top-content .text h1 { color: #fff; }

  .top-content .description {
    margin: 20px 0 10px 0;
  }

  .top-content .description p { opacity: 0.8; }

  .top-content .description a {
    color: #fff;
  }
  .top-content .description a:hover,
  .top-content .description a:focus { border-bottom: 1px dotted #fff; }

  .form-box {
    margin-top: 35px;
  }

  .form-top {
    overflow: hidden;
    padding: 0 25px 15px 25px;
    background: #444;
    background: rgba(0, 0, 0, 0.35);
    -moz-border-radius: 4px 4px 0 0; -webkit-border-radius: 4px 4px 0 0; border-radius: 4px 4px 0 0;
    text-align: left;
  }

  .form-top-left {
    float: left;
    width: 75%;
    padding-top: 25px;
  }

  .form-top-left h3 { margin-top: 0; color: #fff; }
  .form-top-left p { opacity: 0.8; color: #fff; }

  .form-top-right {
    float: left;
    width: 25%;
    padding-top: 5px;
    font-size: 66px;
    color: #fff;
    line-height: 100px;
    text-align: right;
    opacity: 0.3;
  }

  .form-bottom {
    padding: 25px 25px 30px 25px;
    background: #444;
    background: rgba(0, 0, 0, 0.3);
    -moz-border-radius: 0 0 4px 4px; -webkit-border-radius: 0 0 4px 4px; border-radius: 0 0 4px 4px;
    text-align: left;
  }

  .form-bottom form textarea {
    height: 100px;
  }

  .form-bottom form button.btn {
    width: 100%;
  }

  .form-bottom form .input-error {
    border-color: #de615e;
  }
</style>
