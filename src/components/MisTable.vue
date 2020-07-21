<template>
  <div id="mis-table" class="mis-table">
    <el-row class="table-container">
      <el-table
        ref="el-table"
        :data="tabledata"
        :size="size"
        :border="border"
        :row-key="rowKey"
        :show-header="showHeader"
        :empty-text="emptyText"
        @selection-change="selectionChange"
        @select-all="selectionAll"
        @sort-change="sortChange"
      >
        <el-table-column v-if="showSelect" :align="align" reserve-selection :selectable="selectable" type="selection" />
        <el-table-column v-if="showIndex && !mobile" :align="align" label="序號" type="index" :index="tableIndex" />
        <el-table-column
          v-for="(item,index) in tableHeadFilter"
          :key="index"
          :align="align"
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
          :min-width="item.minWidth"
          :show-overflow-tooltip="item.showTooltip"
          :sortable="item.sortable"
          :filters="item.filters"
          :filter-method="item.filterMethod"
          :filter-placement="item.filterPlacement"
        >
          <template slot-scope="scope">
            <template v-if="!item.type">
              <template v-if="item.formatter">{{ item.formatter(scope.row[item.prop],scope.row) }}</template>
              <template v-else>{{ scope.row[item.prop] }}</template>
            </template>
            <component
              :is="item.type"
              v-else
              v-model="scope.row[item.prop]"
              :class="item.class"
              :size="size"
              :active-color="item.activeColor || '#B2D25D'"
              :active-value="item.activeValue || 1"
              :inactive-value="item.inactiveValue || 0"
              @change="item.handleChange(scope.row)"
            />
          </template>
        </el-table-column>
        <slot />
        <el-table-column v-if="showHandle" :align="align" label="操作" :width="handleWidth">
          <template slot-scope="scope">
            <el-button
              v-for="(item,index) in handleList"
              :key="index"
              :type="item.buttonType"
              :icon="item.icon"
              :class="item.handleType + '-button'"
              :size="size"
              :circle="item.circle"
              :plain="item.plain"
              @click="handle(item.handleType,scope.row,scope.$index)"
            >
              <template v-if="item.buttonText">{{ item.buttonText }}</template>
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
        :page-size="pageSize"
        :page-sizes="pageSizes"
        :current-page.sync="pageIndex"
        @size-change="sizeChange"
      />
    </el-row>
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */
export default {
  name: 'MisTable',
  props: {
    data: Array,
    tableHead: Array,
    showHeader: { type: Boolean, default: true },
    border: { type: Boolean, default: true },
    emptyText: { type: String, default: '暫無數據' },
    showIndex: { type: Boolean, default: true },
    showSelect: { type: Boolean, default: false },
    rowKey: [String, Function],
    selectable: Function,
    selectList: Array,
    align: { type: String, default: 'center' },
    size: { type: String, default: 'mini' },
    showHandle: { type: Boolean, default: true },
    handleWidth: String,
    handleList: { type: Array, default: () => {
      return [
        { handleType: 'update', buttonType: 'primary', icon: 'el-icon-edit', circle: true },
        { handleType: 'delete', buttonType: 'danger', icon: 'el-icon-delete', circle: true }
      ]
    } },
    showPage: { type: Boolean, default: true },
    pagePosition: { type: String, default: 'right' },
    pageLayout: { type: String, default: 'total, prev, pager, next, jumper' },
    pageSizes: { type: Array, default: () => { return [10, 20, 50] } },
    pageSize: { type: Number, default: 10 }
  },
  data() {
    return {
      childData: [],
      pageIndex: 1,
      mobile: false
    }
  },
  computed: {
    tabledata() {
      if (this.showPage) {
        return this.childData.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize)
      } else {
        return this.childData
      }
    },
    // 格式表格头
    tableHeadFilter() {
      if (!this.tableHead) {
        return []
      }
      return this.tableHead.filter(o => {
        // 统一type
        if (o.type) {
          if ((o.type.includes('radio') || o.type.includes('checkbox')) && !o.type.includes('-group')) {
            o.type += '-group'
            o.settings.forEach(p => {
              p.labelText = p.label
              p.label = p.value
            })
          }
          if (!o.type.includes('el-')) {
            o.type = 'el-' + o.type
          }
        }
        return !(o.mobileHidden && this.mobile)
      })
    }
  },
  watch: {
    data: {
      handler(val) {
        this.childData = val
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    const w = document.documentElement.offsetWidth || document.body.offsetWidth
    if (w < 670) {
      this.mobile = true
    }
  },
  methods: {
    handle(handleType, val, index) {
      this.$emit('handle', handleType, val, index + (this.pageIndex - 1) * this.pageSize)
    },
    tableIndex(index) {
      return 1 + index + (this.pageIndex - 1) * this.pageSize
    },
    selectionChange(val) {
      this.$emit('update:selectList', val)
    },
    selectionAll(val) {
      var flag = this.selectList.length === this.data.length
      this.data.forEach(o => {
        this.$refs['el-table'].toggleRowSelection(o, !flag)
      })
    },
    sizeChange(val) {
      this.$emit('update:pageSize', val)
    },
    sortChange(val) {
      this.pageIndex = 1
      this.data.sort(this.compare(val.prop, val.order))
    },
    compare(property, order) {
      var vm = this
      return function(a, b) {
        var val1 = a[property]
        var val2 = b[property]
        if (order === 'descending') {
          return vm.valueCompare(val2, val1)
        }
        if (order === 'ascending') {
          return vm.valueCompare(val1, val2)
        } else {
          return 0
        }
      }
    },
    valueCompare(a, b) {
      if (!a || !b) {
        return a - b
      } else {
        var dateA = new Date(a)
        var dateB = new Date(b)
        if (dateA && dateB && dateA !== 'Invalid Date' && dateB !== 'Invalid Date') {
          return dateA - dateB
        } else {
          return a - b
        }
      }
    }
  }
}
</script>

<style lang="scss">

</style>
