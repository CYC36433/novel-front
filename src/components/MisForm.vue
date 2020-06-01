<template>
  <div id="MisForm">
    <el-form
      ref="misForm"
      class="misForm"
      :model="model"
      :rules="rules"
      :size="size"
      :label-width="labelWidth"
      :label-position="labelPosition"
    >
      <el-row>
        <slot name="title" />
      </el-row>
      <el-row>
        <el-col v-for="(item, index) in formHead" :key="index" :span="item.span || span">
          <el-form-item
            class="mis-form-item"
            :label="item.label"
            :prop="item.prop"
            :label-width="item.width"
          >
            <el-radio-group v-if="item.type == 'el-radio-group'" v-model="model[item.prop]">
              <el-radio v-for="(childItem,childIndex) in item.settings.split(',')" :key="childIndex" :label="childItem" />
            </el-radio-group>
            <component
              :is="item.type"
              v-else
              v-model="model[item.prop]"
              :type="item.componentType"
            >
              <template v-if="hasChild(item.type)">
                <component :is="getChildType(item.type)" v-for="(childItem,childIndex) in item.settings.split(',')" :key="childIndex" :label="childItem" :value="childItem" />
              </template>
            </component>
          </el-form-item>
        </el-col>
        <slot name="footer" />
      </el-row>
    </el-form>
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */
export default {
  name: 'MisForm',
  props: {
    model: Object,
    rules: Object,
    labelPosition: String,
    labelWidth: String,
    size: { type: String, default: 'mini' },
    num: { type: Number, default: 1 }, // 每行的item數
    formHead: Array
  },
  computed: {
    span() {
      return Math.round(24 / this.num)
    }
  },
  mounted() {
    // console.log(RadioGroup.name)
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
