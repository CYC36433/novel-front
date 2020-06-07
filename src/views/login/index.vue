<template>
  <div id="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="loginForm" label-width="0">
      <div class="title-container">
        <div class="login-title">开发基本框架</div>
      </div>
      <el-form-item prop="userCode">
        <i class="el-icon-user-solid" />
        <el-input v-model="loginForm.userCode" placeholder="工号" />
      </el-form-item>
      <el-form-item prop="password">
        <i class="el-icon-lock" />
        <el-input v-model="loginForm.password" placeholder="密码" :type="passwordType" @keyup.enter.native="handleLogin" />
        <span class="pwd-icon" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-button :loading="loading" type="primary" class="login-button" @click.native.prevent="handleLogin">登录</el-button>
      <div class="tips">
        <span style="float:right" @click="showDialog">忘記密碼？</span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        userCode: '',
        password: ''
      },
      loginRules: {
        userCode: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      passwordType: 'password',
      loading: false
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType == 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('login', this.loginForm).then(res => {
            this.loading = false
            this.$router.push('/')
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    showDialog() {

    }
  }
}
</script>

<style lang="scss">
$loginColor: #fff;
#login{
  width: 100%;
  height: 100%;
  display: flex;
  background: rgba(113, 152, 202,0.6);
  .loginForm{
    width: 400px;
    align-self: center;
    margin: 0 auto 50px;
    .title-container{
      margin-bottom: 10px;
      text-align: center;
      .login-title{
        color: $loginColor;
        display: inline-block;
        font-size: 22px;
        font-weight: 600;
      }
    }
    .el-form-item__content{
      display: flex;
      align-items: center;
      border-bottom: $loginColor 2px solid;
      i{
        color: $loginColor;
        font-size: 18px;
      }
      .pwd-icon{
        cursor: pointer;
        .svg-icon{
          color: $loginColor;
          font-size: 18px;
        }
      }
      .el-input{
        flex: 1;
        .el-input__inner{
          background: transparent;
          border: 0;
          color: $loginColor;
          font-size: 16px;
          -webkit-appearance: none;
          border-radius: 0;
          &:-webkit-autofill {
            box-shadow: 0 0 0px 1000px transparent inset !important;
            -webkit-text-fill-color: $loginColor !important;
            background-color: transparent;
            background-image: none;
            transition: background-color 50000s ease-in-out 0s;
          }
        }
      }
    }
    .login-button{
      width: 100%;
    }
    .tips{
      margin: 10px 0;
      color: $loginColor;
      font-size: 18px;
      span{
        cursor: pointer;
        &:hover{
          color: #8ca5cb;
          text-decoration: underline;
        }
      }
    }
  }
  ::-webkit-input-placeholder {  /*Webkit browsers 谷歌*/
    color: rgba($color: #fff, $alpha: 0.7);
  }
  :-moz-placeholder {  /*Mozilla Firefox 4 to 8 火狐*/
    color: rgba($color: #fff, $alpha: 0.7);
  }
  ::-moz-placeholder {  /*Mozilla Firefox 9+ 火狐*/
    color: rgba($color: #fff, $alpha: 0.7);
  }
  :-ms-input-placeholder {  /*Internet Explorer 10+ IE10以上*/
    color: rgba($color: #fff, $alpha: 0.7);
  }
}
</style>
