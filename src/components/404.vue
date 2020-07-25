<template>
  <div id="404" class="http404-container">
    <h2>亲。。。</h2>
    <span>页面好像丢失了哦 {{ string }}</span>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      string: '.'
    }
  },
  mounted() {
    setInterval(() => {
      this.changeString()
    }, 1000)
  },
  methods: {
    changeString() {
      if (this.string === '. . . . .') {
        this.string = '.'
      } else {
        this.string += ' .'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.http404-container{
  // transform: translate(-50%,-50%);
  position: absolute;
  top: 30%;
  left: 30%;
  span{
    display: block;
    margin-bottom: 15px;
  }
  .router-link-active{
    color: #6F8EBE;
  }
}
</style>
