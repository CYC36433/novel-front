<template>
  <div id="navbar">
    <!-- web-menu -->
    <el-row class="nav-container">
      <el-menu :default-active="getActive($route.path)" class="nav-menu" active-text-color="#6F8EBE" text-color="#131415" mode="horizontal" router>
        <el-col class="img-container">
          <img src="@/assets/images/fii.png" alt="">
        </el-col>
        <el-col class="title-container">
          <span>MIS系統開發前端基本框架</span>
        </el-col>
        <template v-for="menu in menudata">
          <el-menu-item v-show="!menu.hidden" :key="menu.title" :index="menu.path">{{ menu.title }}</el-menu-item>
        </template>
        <el-col class="avatar-container">
          <el-dropdown trigger="click">
            <el-avatar :size="40">臣</el-avatar>
            <i class="el-icon-arrow-down" />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-menu>
    </el-row>
    <!-- mobile-menu -->
    <el-row class="mobile-nav">
      <span class="avatar-container" @click="showMenu">
        <el-avatar :size="36">臣</el-avatar>
      </span>
      <span class="nav-center">
        <i class="el-icon-plus" />
      </span>
      <span class="nav-right">
        <i class="el-icon-date" />
        <!-- <i class="el-icon-date" /> -->
      </span>
      <el-drawer :visible.sync="menuVisible" direction="ltr" size="200px" :with-header="false" :show-close="false">
        <el-row class="info-container">
          <el-avatar :size="36">臣</el-avatar>
          <span class="info-content">
            <div>F1336521</div>
            <div>陳越臣</div>
          </span>
        </el-row>
        <!-- <el-menu :default-active="$route.path" class="nav-menu" active-text-color="#6F8EBE" text-color="#131415" mode="horizontal" router>
          <template v-for="menu in menudata">
            <el-submenu v-if="menu.children" v-show="!menu.hidden" :key="menu.title" :index="menu.title">
              <template slot="title">{{ menu.title }}</template>
              <menutree :data="menu.children" />
            </el-submenu>
            <el-menu-item v-else v-show="!menu.hidden" :key="menu.title" :index="menu.path">{{ menu.title }}</el-menu-item>
          </template>
        </el-menu> -->
      </el-drawer>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuVisible: false
    }
  },
  computed: {
    menudata() {
      return this.$router.options.routes
    }
  },
  methods: {
    getActive(val) {
      var b1 = this.$router.options.routes.filter(o => {
        return o.path != '/' && val.indexOf(o.path) == 0
      })
      return b1[0].path
    },
    showMenu() {
      this.menuVisible = true
    }
  }
}
</script>

<style lang="scss">
#navbar{
  // background: #F9F9F9;
  min-height: 80px;
  padding-top: 12px;
  box-shadow: 0 0 5px #C0C0C0;
  .mobile-nav{
    display: none;
  }
  .nav-container{
    // max-width: 1440px;
    margin: 0 auto;
    .nav-menu{
      padding:0 10px;
      border-bottom: none;
      .el-col{
        padding-top:5px;
      }
      .img-container{
        width: 240px;
        text-align: center;
        img{
          max-height: 45px;
        }
      }
      .title-container{
        color: #133368;
        width: 360px;
        padding-top: 12px;
        font-size: 22px;
        font-weight: 600;
      }
      .el-menu-item{
        height: 45px;
        font-size: 20px;
        padding: 0;
        margin: 0 18px;
      }
      .avatar-container{
        float: right;
        width: 65px;
        margin-top: 5px;
        .el-avatar{
          cursor: pointer;
        }
        .el-icon-arrow-down{
          position: relative;
          top: -10px;
          cursor: pointer;
        }
      }
    }
  }
}
@media screen and (max-width: 1440px) {
#navbar{
  .nav-container{
    .nav-menu{
      .title-container{
        width: 280px;
      }
      .el-menu-item{
        font-size: 18px;
        margin: 0 5px;
      }
    }
  }
}
}
@media screen and (max-width: 670px) {
#navbar{
  min-height: 50px;
  padding-top: 6px;
  .nav-container{
    display: none;
  }
  .mobile-nav{
    display: flex;
    .avatar-container{
      padding-left: 10px;
    }
    .nav-center{
      flex: 1;
      text-align: center;
      font-size: 28px;
    }
    .nav-right{
      padding-right: 10px;
      font-size: 28px;
    }
    .el-drawer{
      .info-container{
        height: 80px;
        padding: 15px 0 0 18px;
        background: #144794;
        color: #FFFFFF;
        .info-content{
          display: inline-block;
          margin-left: 15px;
        }
      }
    }
  }
}
}
</style>
