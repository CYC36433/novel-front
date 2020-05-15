<template>
  <div id="layout">
    <!-- 侧边栏sidebar -->
    <!-- <sidebar class="sidebar-container"></sidebar> -->
    <div class="main-container">
      <navbar />
      <app-main />
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import AppMain from './components/AppMain'

export default {
  components: { Navbar, AppMain }
}
</script>

<style lang="scss">
// $bg: rgb(217, 236, 255);
$bg: rgb(255, 255, 255);
#app{
  background: $bg;
  height: 100%;
}
#app-main{
  width: 1440px;
  padding: 10px 20px;
  margin: 0 auto;
}
</style>
