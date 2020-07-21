<template>
  <el-form
    ref="el-form"
    class="mis-form"
    :model="model"
    :rules="rules"
    :inline="inline"
    :size="size"
    :label-width="labelWidth"
    :label-position="labelPosition"
  >
    <slot name="title" />
    <el-row class="mis-form-row">
      <slot />
      <el-col v-for="(item, index) in formHeadFilter" :key="index" :span="item.span || span">
        <el-form-item
          class="mis-form-item"
          :class="item.class"
          :label="item.label"
          :prop="item.prop"
          :label-width="item.width"
          :rules="item.rules"
        >
          <template v-if="!item.type">
            <span v-if="item.formatter">{{ item.formatter(model[item.prop]) }}</span>
            <span v-else>{{ model[item.prop] }}</span>
          </template>
          <!-- el-radio-group组件的name属性报错 -->
          <el-radio-group v-else-if="item.type == 'el-radio-group'" v-model="model[item.prop]">
            <el-radio v-for="(childItem,childIndex) in item.settings" :key="childIndex" :label="childItem.label">
              {{ childItem.labelText }}
            </el-radio>
          </el-radio-group>
          <component
            :is="item.type"
            v-else
            v-model="model[item.prop]"
            :disabled="item.disabled"
            :placeholder="item.placeholder"
            :type="item.componentType"
            :clearable="item.clearable"
            :readonly="item.readonly"
            :autosize="item.autosize"
            :multiple="item.multiple"
            :rows="item.rows || 5"
            :prefix-icon="item.prefixIcon"
            :suffix-icon="item.suffixIcon"
            :min="item.min"
            :max="item.max"
            :active-color="item.activeColor || '#B2D25D'"
            :active-value="item.activeValue || 1"
            :inactive-value="item.inactiveValue || 0"
          >
            <template v-if="hasChild(item.type)">
              <component :is="getChildType(item.type)" v-for="(childItem,childIndex) in item.settings" :key="childIndex" :label="childItem.label" :value="childItem.value" :disabled="childItem.disabled">
                <template v-if="childItem.labelText">{{ childItem.labelText }}</template>
              </component>
            </template>
          </component>
        </el-form-item>
      </el-col>
      <slot name="footer" />
      <el-col v-if="showHandle" :span="handlespan || span">
        <el-form-item class="mis-form-item mis-handle-item" :label-width="handleWidth || '0px'">
          <el-button
            v-for="(item,index) in handleList"
            :key="index"
            :type="item.buttonType"
            :icon="item.icon"
            :class="item.handleType + '-button'"
            :size="size"
            :circle="item.circle"
            :plain="item.plain"
            @click="handle(item.handleType)"
          >
            <template v-if="item.buttonText">{{ item.buttonText }}</template>
          </el-button>
        </el-form-item>
      </el-col>
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
    inline: { type: Boolean, default: false },
    labelPosition: String,
    labelWidth: { type: String, default: '100px' },
    size: { type: String, default: 'medium' },
    num: { type: Number, default: 1 }, // 每行的item數
    showHandle: { type: Boolean, default: true },
    handlespan: Number,
    handleWidth: String,
    handleList: { type: Array, default: () => {
      return [
        { handleType: 'save', buttonType: 'primary', buttonText: '保存' },
        { handleType: 'cancel', buttonType: 'primary', buttonText: '取消', plain: true }
      ]
    } }
  },
  computed: {
    span() {
      return Math.round(24 / this.num)
    },
    // 格式表单头
    formHeadFilter() {
      if (!this.formHead) {
        return []
      }
      return this.formHead.filter(o => {
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
        // 添加必填校验
        if (o.required && !o.rules) {
          var ruleMessage = o.label || o.placeholder || ''
          o.rules = [{ required: true, trigger: ['blur', 'change'], message: `${ruleMessage.replace(/\s*/g, '')}不能為空` }]
        }
        return true
      })
    }
  },
  methods: {
    hasChild(val) {
      return val === 'el-select' ||
              val === 'el-radio-group' ||
              val === 'el-checkbox-group'
    },
    getChildType(val) {
      return val === 'el-select' ? 'el-option'
        : val === 'el-radio-group' ? 'el-radio'
          : val === 'el-checkbox-group' ? 'el-checkbox'
            : ''
    },
    handle(handleType) {
      this.$emit('handle', handleType)
    }
  }
}
</script>

<style lang="scss">
.mis-form{
  .el-select{
    width: 100%;
  }
  .el-date-editor{
    width: 100%;
  }
  .mis-handle-item{
    text-align: center;
  }
}
</style>
