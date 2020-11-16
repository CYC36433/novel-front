<template>
  <div id="navbar">
    <el-row class="nav-container">
      <el-col class="title-container">
        <div @click="$router.push('/')">鱼书</div>
      </el-col>
      <el-col class="search-container nav-center">
        <el-input v-model="searchContent" placeholder="输入关键词查询小说" @keyup.native.enter="search">
          <el-button slot="append" icon="el-icon-search" @click="search" />
        </el-input>
      </el-col>
      <el-col class="avatar-container">
        <el-button v-if="!$store.getters.token" type="text" @click="dialogVisible = true">登录</el-button>
        <el-dropdown v-else trigger="click">
          <el-avatar :size="40" icon="el-icon-user-solid" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="$router.push('/userCenter/mySubscribe')">我的订阅</div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="logout">注销登录</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" center :close-on-click-modal="false" :modal-append-to-body="false" @close="closeDialog">
      <template slot="title">
        <el-tabs v-model="activeName">
          <el-tab-pane label="登　　录" name="first" />
          <el-tab-pane label="注　　册" name="second" />
        </el-tabs>
      </template>
      <mis-form v-if="activeName == 'first'" ref="loginForm" class="loginForm" :model="loginForm" :form-head="loginFormHead" label-width="0" :handle-list="loginFormHandleList" @handle="handleLogin" />
      <mis-form v-else ref="registerForm" class="loginForm" :model="registerForm" :form-head="registerFormHead" label-width="0" :handle-list="registerFormHandleList" @handle="handleRegister" />
    </el-dialog>
  </div>
</template>

<script>
import userApi from '@/api/user'
export default {
  data() {
    const confirmPasswordValidator = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'))
      } else {
        if (value !== this.registerForm.password) {
          callback(new Error('前后密码输入不一致'))
        }
        callback()
      }
    }
    return {
      searchContent: '',
      dialogVisible: false,
      drawerVisible: false,
      activeName: 'first',
      loginForm: {},
      loginFormHead: [
        { label: '', prop: 'username', type: 'input', placeholder: '账号', required: true },
        { label: '', prop: 'password', type: 'input', placeholder: '密码', componentType: 'password', required: true }
      ],
      loginFormHandleList: [
        { handleType: 'save', buttonType: 'primary', buttonText: '登录', loading: false }
      ],
      registerForm: {},
      registerFormHead: [
        { label: '', prop: 'username', type: 'input', placeholder: '账号', required: true },
        { label: '', prop: 'email', type: 'input', placeholder: '邮箱', required: true },
        { label: '', prop: 'password', type: 'input', placeholder: '密码', componentType: 'password', required: true },
        { label: '', prop: 'confirmPassword', type: 'input', placeholder: '确认密码', componentType: 'password', rules: [{ required: true, trigger: 'blur', validator: confirmPasswordValidator }] }
      ],
      registerFormHandleList: [
        { handleType: 'save', buttonType: 'primary', buttonText: '注册', loading: false }
      ]
    }
  },
  watch: {
    activeName: {
      handler(val) {
        this.reset()
      }
    },
    $route: {
      handler(val) {
        if (val.path !== '/searchResult') {
          this.searchContent = ''
        } else {
          this.searchContent = this.$route.query.keyword || ''
        }
      },
      deep: true
    }
  },
  mounted() {
    this.searchContent = this.$route.query.keyword || ''
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
      } else {
        this.$router.push('/')
      }
    },
    handleLogin() {
      this.$refs['loginForm'].$refs['el-form'].validate(valid => {
        if (valid) {
          this.loginFormHandleList[0].loading = true
          this.$store.dispatch('login', this.loginForm).then(() => {
            this.loginFormHandleList[0].loading = false
            location.reload()
          }).catch(() => {
            this.loginFormHandleList[0].loading = false
          })
        } else {
          return false
        }
      })
    },
    handleRegister() {
      this.$refs['registerForm'].$refs['el-form'].validate(valid => {
        if (valid) {
          this.registerFormHandleList[0].loading = true
          userApi.signUp(this.registerForm).then(res => {
            this.registerFormHandleList[0].loading = false
            this.activeName = 'first'
          }).catch(() => {
            this.registerFormHandleList[0].loading = false
          })
        } else {
          return false
        }
      })
    },
    reset() {
      this.loginForm = {}
      this.registerForm = {}
      this.$nextTick(() => {
        if (this.$refs['loginForm']) {
          this.$refs['loginForm'].$refs['el-form'].clearValidate()
        }
        if (this.$refs['registerForm']) {
          this.$refs['registerForm'].$refs['el-form'].clearValidate()
        }
      })
    },
    closeDialog() {
      this.activeName = 'first'
      this.reset()
    },
    async logout() {
      await this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="scss">
#navbar{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  min-height: 80px;
  padding-top: 18px;
  background: #ffffff;
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
      cursor: pointer;
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
    .save-button{
      width: 100%;
    }
  }
}
@media screen and (max-width: 670px){
  #navbar{
    .nav-container{
      .title-container{
        width: 70px;
        font-size: 20px;
      }
      .search-container{
        padding: 0;
      }
      .avatar-container{
        width: 60px;
      }
    }
    .loginForm{
      width: 280px;
    }
  }
}
</style>
