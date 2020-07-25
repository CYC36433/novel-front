<template>
  <div id="Footer">
    <div class="copyrights">
      © Copyrights <strong>Alex</strong>. All Rights Reserved.
      <a href="http://www.beian.miit.gov.cn" target="_blank">赣ICP备17013246号</a>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
#Footer{
  height: 60px;
  padding: 20px 0;
  text-align: center;
  font-size: 14px;
  color: #555555;
  background: #eeeeee;
  a{
    color: #6F8EBE;
    text-decoration: none;
    cursor: pointer;
    &:hover{
      color: #7b7b7b;
    }
  }
}
@media screen and (max-width: 670px) {
#Footer{
  font-size: 12px;
}
}
</style>
