<template>
  <div id="menutree">
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
/* eslint-disable vue/require-default-prop */
import Menutree from '@/components/Menutree'
export default {
  name: 'Menutree',
  components: { Menutree },
  props: {
    data: Array
  },
  methods: {
    go(val) {
      window.open(val)
    }
  }
}
</script>

<style lang="scss">

</style>
