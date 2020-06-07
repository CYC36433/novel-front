<template>
  <div id="layout">
    <navbar />
    <div class="main-container">
      <sidebar ref="Sidebar" class="Sidebar" :class="{'hidbar':hidFlag}" />
      <app-main ref="app-main" class="app-main" :class="{'app-main-w':hidFlag}" />
      <br style="clear:both;">
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AppMain from './components/AppMain'

export default {
  components: { Navbar, AppMain, Sidebar },
  data() {
    return {
      hidFlag: false
    }
  }
}
</script>

<style lang="scss">
// $bg: rgb(217, 236, 255);
$bg: rgb(255, 255, 255);
$sidebarWidth: 160px;
#app{
  background: $bg;
}
.main-container{
  position: relative;
  // width: 100%;
  // height: 100%;
  // margin: 0 auto;
}
.Sidebar{
  display: inline-block;
  position: absolute;
  width: $sidebarWidth;
  height: 100%;
  margin-top: 2px;
}
.hidbar{
  width: 0;
}
.app-main{
  float: right;
  width: calc(100% - #{$sidebarWidth});
  padding: 20px;
  .el-row{
    padding: 8px;
  }
}
.app-main-w{
  width: 100%;
}
@media screen and (max-width: 670px) {
.Sidebar{
  display: none;
}
.app-main{
  width: 100%;
}
}
</style>
