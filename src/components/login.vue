<template>
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
        <label class="input-error" v-show="errorMessage">{{errorMessage}}</label>
        <div class="form-group">
          <input type="text" value="刘白菜" readonly name="form-username" placeholder="Username..."
                 class="form-username form-control">
        </div>
        <div class="form-group">
          <input type="password" name="form-password" placeholder="Password..."
                 v-model="password" @keyup.enter="onSubmit"
                 class="form-password form-control">
        </div>
        <button type="button" @click.prevent="onSubmit" class="btn btn-default">Sign in!</button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data: function () {
      return {
        password: '',
        errorMessage: ''
      }
    },
    methods: {
      onSubmit () {
        if (this.password.length <= 0) {
          this.errorMessage = 'input password'
        } else {
          var that = this
          this.toLogin(that.md5(that.password)).then(function (data) {
            if (data['code'] === 200) {
              that.errorMessage = ''
              that.$cookie.set('admin_authorization', data['data']['token'], 30)
              that.$router.push({name: 'Manager'})
            } else {
              that.errorMessage = data['message']
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  h1, h2 {
    margin-top: 10px;
    font-size: 38px;
    font-weight: 100;
    color: #333;
    line-height: 50px;
  }

  h3 {
    font-size: 22px;
    font-weight: 300;
    color: #333;
    line-height: 30px;
  }

  ::-moz-selection { background: #de615e; color: #fff; text-shadow: none; }
  ::selection { background: #de615e; color: #fff; text-shadow: none; }

  .btn-link-1 i {
    padding-right: 5px;
    vertical-align: middle;
    font-size: 20px;
    line-height: 20px;
  }

  .form-box {
    margin-top: 35px;
  }

  .form-top {
    overflow: hidden;
    padding: 0 25px 15px 25px;
    background: #444;
    background: rgba(0, 0, 0, 0.65);
    -moz-border-radius: 4px 4px 0 0;
    -webkit-border-radius: 4px 4px 0 0;
    border-radius: 4px 4px 0 0;
    text-align: left;
  }

  .form-top-left {
    float: left;
    width: 75%;
    padding-top: 25px;
  }

  .form-top-left h3 {
    margin-top: 0;
    color: #fff;
  }
  .form-top-left p {
    opacity: 0.8;
    color: #fff;
  }

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
    background: rgba(0, 0, 0, 0.6);
    -moz-border-radius: 0 0 4px 4px;
    -webkit-border-radius: 0 0 4px 4px;
    border-radius: 0 0 4px 4px;
    text-align: left;
  }

  .form-bottom form textarea {
    height: 100px;
  }

  .form-bottom form button.btn {
    width: 100%;
  }

  .form-bottom form .input-error {
    color: #de615e;
  }
</style>
