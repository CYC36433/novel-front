<template>
  <div id="mis-table" class="mis-table">
    <el-row class="table-container">
      <el-table
        ref="el-table"
        :data="tabledata"
        :size="size"
        :border="border"
        :row-key="rowKey"
        @selection-change="selectionChange"
      >
        <el-table-column v-if="showIndex" :align="align" label="序号" type="index" />
        <el-table-column v-if="showSelect" :align="align" reserve-selection :selectable="selectable" type="selection" />
        <el-table-column
          v-for="(item,index) in tableHead"
          :key="index"
          :align="align"
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
        >
          <template slot-scope="scope">
            <span v-if="!item.type">{{ scope.row[item.prop] }}</span>
            <component
              :is="item.type"
              v-else
              v-model="scope.row[item.prop]"
              :size="size"
              :active-color="item.activeColor"
              :active-value="item.activeValue"
              :inactive-value="item.inactiveValue"
              @change="item.handleChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column v-if="showHandle" :align="align" label="操作">
          <template slot-scope="scope">
            <el-button v-for="(item,index) in handleList" :key="index" :type="item.buttonType" :icon="item.icon" :class="item.handleType + '-button'" :size="size" :circle="item.circle" @click="handle(item.handleType,scope.row)">
              <span v-if="item.buttonText">{{ item.buttonText }}</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row v-if="showPage" class="page-container">
      <el-pagination
        ref="el-pagination"
        small
        :style="{'text-align':pagePosition}"
        :layout="pageLayout"
        :total="data.length"
        :page-sizes="pageSizes"
        :current-page.sync="pageIndex"
        :page-size.sync="pageSize"
      />
    </el-row>
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */
export default {
  props: {
    data: Array,
    tableHead: Array,
    border: { type: Boolean, default: true },
    showIndex: { type: Boolean, default: true },
    showSelect: { type: Boolean, default: false },
    rowKey: [String, Function],
    selectable: Function,
    align: { type: String, default: 'center' },
    size: { type: String, default: 'mini' },
    showHandle: { type: Boolean, default: true },
    handleList: { type: Array, default: () => {
      return [
        { handleType: 'update', buttonType: 'primary', icon: 'el-icon-edit', circle: true },
        { handleType: 'delete', buttonType: 'danger', icon: 'el-icon-delete', circle: true }
      ]
    } },
    showPage: { type: Boolean, default: true },
    pagePosition: { type: String, default: 'right' },
    pageLayout: { type: String, default: 'total, prev, pager, next, jumper' },
    pageSizes: { type: Array, default: () => { return [10, 20, 50] } }
  },
  data() {
    return {
      pageIndex: 1,
      pageSize: 10
    }
  },
  computed: {
    tabledata() {
      if (this.showPage) {
        return this.data.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize)
      } else {
        return this.data
      }
    }
  },
  mounted() {
  },
  methods: {
    handle(handleType, val) {
      this.$emit('handle', handleType, val)
    },
    selectionChange(val) {
      this.$emit('selectionChange', val)
    }
  }
}
</script>

<style>

</style>
