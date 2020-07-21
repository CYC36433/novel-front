<template>
  <div id="navbar">
    <el-row class="nav-container web-show">
      <el-col class="title-container">
        <span>鱼书</span>
      </el-col>
      <el-col class="search-container nav-center">
        <el-input v-model="searchContent" placeholder="ISBN,图书名称" @keyup.native.enter="search">
          <el-button slot="append" icon="el-icon-search" @click="search" />
        </el-input>
      </el-col>
      <el-col class="avatar-container">
        <el-button type="text" @click="dialogVisible = true">登录</el-button>
        <!-- <el-button type="text">注册</el-button> -->
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" center :close-on-click-modal="false">
      <template slot="title">
        <el-tabs v-model="activeName">
          <el-tab-pane label="登　　录" name="first" />
          <el-tab-pane label="注　　册" name="second" />
        </el-tabs>
      </template>
      <mis-form v-if="activeName === 'first'" ref="loginForm" class="loginForm" label-width="0" :model="loginForm" :show-handle="false">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="账号" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-button" @click="handleLogin">登录</el-button>
        </el-form-item>
      </mis-form>
      <mis-form v-else ref="loginForm" class="loginForm" label-width="0" :model="loginForm" :show-handle="false">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="账号" />
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="loginForm.email" placeholder="邮箱" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="密码" />
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input v-model="loginForm.confirmPassword" placeholder="确认密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-button" @click="handleLogin">注册</el-button>
        </el-form-item>
      </mis-form>
      <!-- <mis-form ref="loginForm" class="loginForm" :model="loginForm" :form-head="loginFormHead" label-width="80px" :handle-list="loginFormHandleList" @handle="handleLoginForm" /> -->
    </el-dialog>
  </div>
</template>

<script>
import userApi from '@/api/user'
export default {
  data() {
    return {
      searchContent: '',
      dialogVisible: false,
      activeName: 'first',
      loginForm: {}
    }
  },
  computed: {
    loginFormHead() {
      if (this.activeName === 'second') {
        return [
          { label: '1', prop: 'username', type: 'input', placeholder: '账号', required: true },
          { label: '2', prop: 'email', type: 'input', placeholder: '邮箱', rules: [{ required: true, trigger: 'blur', message: '邮箱不能为空' }] },
          { label: '3', prop: 'password', type: 'input', placeholder: '密码', componentType: 'password' },
          { label: '4', prop: 'confirmPassword', type: 'input', placeholder: '确认密码', componentType: 'password' }
        ]
      } else {
        return [
          { label: '1', prop: 'username', type: 'input', placeholder: '账号' },
          { label: '2', prop: 'password', type: 'input', placeholder: '密码', componentType: 'password' }
        ]
      }
    }
  },
  watch: {
    activeName: {
      handler(val) {
        // this.loginForm = {}
        if (val === 'second') {
          // this.loginFormHead = [
          //   { label: '1', prop: 'username', type: 'input', placeholder: '账号', required: true },
          //   { label: '2', prop: 'email', type: 'input', placeholder: '邮箱', rules: [{ required: true, trigger: 'blur', message: '邮箱不能为空' }] },
          //   { label: '3', prop: 'password', type: 'input', placeholder: '密码', componentType: 'password' },
          //   { label: '4', prop: 'confirmPassword', type: 'input', placeholder: '确认密码', componentType: 'password' }
          // ]
          this.loginFormHandleList = [
            { handleType: 'save', buttonType: 'primary', buttonText: '注册' }
          ]
        } else {
          // this.loginFormHead = [
          //   { label: '1', prop: 'username', type: 'input', placeholder: '账号' },
          //   { label: '2', prop: 'password', type: 'input', placeholder: '密码', componentType: 'password' }
          // ]
          this.loginFormHandleList = [
            { handleType: 'save', buttonType: 'primary', buttonText: '登录' }
          ]
        }
      },
      immediate: true
    }
  },
  methods: {
    search() {
      if (this.searchContent) {
        this.$router.push({
          path: '/searchResult',
          query: {
            keyword: this.searchContent
          }
        })
      }
    },
    handleLogin() {

    },
    handleLoginForm(handleType) {
      this.$refs['loginForm'].$refs['el-form'].validate(valid => {
        if (valid) {
          if (this.activeName === 'second') {
            userApi.signUp(this.loginForm).then(res => {
              console.log(res)
            })
          }
        } else {
          return false
        }
      })
    },
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss">
#navbar{
  min-height: 80px;
  padding-top: 18px;
  box-shadow: 0 0 5px #C0C0C0;
  .nav-container{
    display: flex;
    max-width: 1440px;
    margin: 0 auto;
    .title-container{
      color: #133368;
      width: 160px;
      padding-top: 5px;
      font-size: 22px;
      font-weight: 600;
      text-align: center;
    }
    .search-container{
      display: flex;
      flex: 1;
      padding: 0 3%;
    }
    .avatar-container{
      // float: right;
      width: 160px;
      text-align: center;
      .el-icon-arrow-down{
        position: relative;
        top: -10px;
        cursor: pointer;
      }
    }
  }
  .el-tabs{
    .el-tabs__nav{
      float: none;
      display: inline-block;
      margin-left: -30px;
      .el-tabs__active-bar{
        display: none;
      }
      .el-tabs__item{
        & + .el-tabs__item{
          margin-left: 50px;
        }
        // &.is-active{
        //   color: #31c27c;
        // }
        // &:hover{
        //   color: #31c27c;
        // }
      }
    }
  }
  .loginForm{
    width: 310px;
    margin: 0 auto;
    .login-button{
      width: 100%;
    }
  }
}
</style>
