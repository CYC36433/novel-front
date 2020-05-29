<template>
  <div id="layout">
    <navbar />
    <div class="main-container">
      <sidebar />
      <app-main />
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AppMain from './components/AppMain'

export default {
  components: { Navbar, AppMain, Sidebar }
}
</script>

<style lang="scss">
// $bg: rgb(217, 236, 255);
$bg: rgb(255, 255, 255);
$sidebarWidth: 160px;
#app{
  background: $bg;
  height: 100%;
}
.main-container{
  width: 100%;
  margin: 0 auto;
}
#Sidebar{
  display: inline-block;
  width: $sidebarWidth;
  margin-top: 2px;
}
#app-main{
  float: right;
  width: calc(100% - #{$sidebarWidth});
  padding: 10px 20px;
}
// @media screen and (max-width: 1440px) {
// .main-container{
//   width: 100%;
// }
// }
@media screen and (max-width: 670px) {
#Sidebar{
  display: none;
}
#app-main{
  width: 100%;
}
}
</style>
