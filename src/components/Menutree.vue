<template>
  <div id="menutree" :class="{'wid-menu':flag}" :style="{'width':width}">
    <template v-for="menu in data">
      <el-submenu v-if="menu.children && menu.children.length" :key="menu.title" :index="menu.title">
        <template slot="title">{{ menu.title }}</template>
        <menutree :data="menu.children" />
      </el-submenu>
      <el-menu-item v-else-if="menu.component" :key="menu.title" :index="menu.path">{{ menu.title }}</el-menu-item>
      <li v-else :key="menu.title" class="el-menu-item" @click="go(menu.path)">
        {{ menu.title }}
      </li>
    </template>
  </div>
</template>

<script>
import Menutree from '@/components/Menutree'
export default {
  name: 'Menutree',
  components: { Menutree },
  props: {
    data: {
      type: Array,
      default: null
    },
    width: {
      type: String,
      default: ''
    }
  },
  computed: {
    flag() {
      if (this.width) {
        return true
      } else { return false }
    }
  },
  methods: {
    go(val) {
      window.open(val)
    }
  }
}
</script>
<style lang="scss">
.wid-menu{
  .el-menu-item{
    display: block;
    padding: 10px 10px !important;
    height: auto !important;
    min-height: 45px;
    line-height: 25px !important;
    white-space:normal;
    word-break : break-all;
    word-wrap: break-word;
  }
}
</style>
