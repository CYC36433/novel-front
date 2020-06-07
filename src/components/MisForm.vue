<template>
  <el-form
    ref="el-form"
    class="misForm"
    :model="model"
    :rules="rules"
    :size="size"
    :label-width="labelWidth"
    :label-position="labelPosition"
  >
    <slot name="title" />
    <el-row>
      <el-col v-for="(item, index) in formHead" :key="index" :span="item.span || span">
        <el-form-item
          class="mis-form-item"
          :label="item.label"
          :prop="item.prop"
          :label-width="item.width"
        >
          <el-radio-group v-if="item.type == 'el-radio-group'" v-model="model[item.prop]">
            <el-radio v-for="(childItem,childIndex) in item.settings" :key="childIndex" :label="childItem" />
          </el-radio-group>
          <component
            :is="item.type"
            v-else
            v-model="model[item.prop]"
            :placeholder="item.placeholder"
            :type="item.componentType"
            :min="item.min"
            :max="item.max"
            :active-color="item.activeColor"
            :active-value="item.activeValue"
            :inactive-value="item.inactiveValue"
          >
            <template v-if="hasChild(item.type)">
              <component :is="getChildType(item.type)" v-for="(childItem,childIndex) in item.settings" :key="childIndex" :label="childItem.label" :value="childItem.value" />
            </template>
          </component>
        </el-form-item>
      </el-col>
      <el-col v-if="showHandle" :span="span">
        <el-form-item class="mis-form-item" style="text-align:center" label-width="0">
          <el-button type="success" class="save-button" :size="size" @click="handleSave">{{ saveText }}</el-button>
          <el-button type="danger" class="cancel-button" :size="size" @click="handleCancel">{{ cancelText }}</el-button>
        </el-form-item>
      </el-col>
      <slot name="footer" />
    </el-row>
  </el-form>
</template>

<script>
/* eslint-disable vue/require-default-prop */
export default {
  name: 'MisForm',
  props: {
    model: Object,
    formHead: Array,
    rules: Object,
    labelPosition: String,
    labelWidth: { type: String, default: '100px' },
    size: { type: String, default: 'mini' },
    num: { type: Number, default: 1 }, // 每行的item數
    showHandle: { type: Boolean, default: true },
    saveText: { type: String, default: '保存' },
    cancelText: { type: String, default: '取消' }
  },
  computed: {
    span() {
      return Math.round(24 / this.num)
    }
  },
  methods: {
    hasChild(val) {
      return val == 'el-select' ||
             val == 'el-checkbox-group'
    },
    getChildType(val) {
      return val == 'el-select' ? 'el-option'
        : val == 'el-checkbox-group' ? 'el-checkbox'
          : ''
    },
    handleSave() {
      this.$emit('handleSave')
    },
    handleCancel() {
      this.$emit('handleCancel')
    }
  }
}
</script>

<style lang="scss">
.misForm{
  .el-select{
    width: 100%;
  }
  .el-date-editor{
    width: 100%;
  }
}
</style>
