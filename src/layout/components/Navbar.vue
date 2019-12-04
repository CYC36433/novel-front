<template>
  <div id="navbar">
    <el-row class="header-container">
      <el-col class="img-container">
        <img src="@/assets/images/fii.png" alt="">
      </el-col>
      <el-col class="title-container">
        <h1>MIS系統開發前端基本框架</h1>
      </el-col>
    </el-row>
    <el-row class="nav-container">
      <el-menu :default-active="$route.path" class="nav-menu" active-text-color="#ffd04b" text-color="#fff" background-color="#545c64" mode="horizontal" router>
      <template v-for="menu in menudata">
        <el-submenu v-if="menu.children" v-show="!menu.hidden" :key="menu.title" :index="menu.title">
        <template slot="title">{{ menu.title }}</template>
        <menutree :data="menu.children" />
        </el-submenu>
        <el-menu-item v-else v-show="!menu.hidden" :key="menu.title" :index="menu.path">{{ menu.title }}</el-menu-item>
      </template>
      </el-menu>
    </el-row>
  </div>
</template>

<script>
import Menutree from '@/components/Menutree'

export default {
  components: { Menutree },
  data() {
    return {
    }
  },
  computed: {
    menudata() {
      var b1 = this.$router.options.routes.concat(global.antRouter)
      return b1
    }
  }
}
</script>

<style lang="scss">
#navbar{
  .header-container{
    .img-container{
      padding: 10px 20px 0;
      width: 320px;
      img{
        max-height: 70px;
      }
    }
    .title-container{
      color: #303133;
      width: 445px;
    }
  }
  .nav-container{
    .nav-menu{
      padding-left: 60px;
    }
  }
}
</style>