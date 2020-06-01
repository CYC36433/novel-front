<template>
  <div id="Sidebar">
    <el-menu :default-active="$route.path" class="nav-menu" active-text-color="#6F8EBE" text-color="#4C4C4C" background-color="#F2F2F2" router>
      <template v-for="menu in menudata">
        <el-submenu v-if="menu.children" v-show="!menu.hidden" :key="menu.title" :index="menu.title">
          <template slot="title">{{ menu.title }}</template>
          <menutree :data="menu.children" />
        </el-submenu>
        <el-menu-item v-else v-show="!menu.hidden" :key="menu.title" :index="menu.path">{{ menu.title }}</el-menu-item>
      </template>
    </el-menu>
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
      var b1 = this.$route.path
      var b2 = this.$router.options.routes.filter(o => {
        return o.path != '/' && b1.indexOf(o.path) == 0
      })
      return b2[0].children
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss">
#Sidebar{
  .nav-menu{
    height: calc(100vh - 83px);
    padding-top: 15px;
    border-right: none;
    .el-menu-item{
      height: 50px;
      font-size: 16px;
      text-align: center;
      &:hover{
        background: #FFFFFF !important;
      }
    }
    .el-menu-item.is-active{
      background: #FFFFFF !important;
      border-left: solid #6F8EBE 6px;
    }
    .el-submenu .el-menu-item{
      min-width: 155px;
    }
  }
}
</style>
