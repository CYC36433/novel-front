<template>
  <div id="404" class="http404-container">
    <h1>MIS</h1>
    <span>該頁面不存在</span>
    <router-link to="/">返回首頁</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.http404-container{
  transform: translate(-50%,-50%);
  position: absolute;
  top: 40%;
  left: 40%;
}
</style>
