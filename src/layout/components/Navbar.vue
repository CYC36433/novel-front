<template>
  <div id="navbar">
    <el-row class="nav-container">
      <el-menu :default-active="$route.path" class="nav-menu" active-text-color="#BA1F33" text-color="#133368" background-color="#F9F9F9" mode="horizontal" router>
        <el-col class="img-container">
          <img src="@/assets/images/fii.png" alt="">
        </el-col>
        <el-col class="title-container">
          <h1>MIS系統開發前端基本框架</h1>
        </el-col>
        <template v-for="menu in menudata">
          <el-submenu v-if="menu.children" v-show="!menu.hidden" :key="menu.title" :index="menu.title" style="float:right">
            <template slot="title">{{ menu.title }}</template>
            <menutree :data="menu.children" />
          </el-submenu>
          <el-menu-item v-else v-show="!menu.hidden" :key="menu.title" :index="menu.path" style="float:right">{{ menu.title }}</el-menu-item>
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
      return b1.reverse()
    }
  }
}
</script>

<style lang="scss">
#navbar{
  background: #F9F9F9;
  box-shadow: 0 0 5px #888;
  .nav-container{
    width: 1440px;
    margin: 0 auto;
    .nav-menu{
      padding:0 10px;
      border-bottom: none;
      .el-col{
        padding-top:5px;
      }
      .img-container{
        width: 200px;
        img{
          max-height: 50px;
        }
      }
      .title-container{
        color: #133368;
        width: 400px;
        h1{
          margin: 0;
        }
      }
    }
  }
}
</style>
