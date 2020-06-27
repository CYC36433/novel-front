<template>
  <div id="infoUpdate">
    <mis-form :model="exForm" :form-head="formHead" label-width="90px" :num="4" :show-handle="false">
      <h2 slot="title">個人信息</h2>
      <template slot="footer">
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="test">測試</el-button>
          </el-form-item>
        </el-col>
      </template>
    </mis-form>
  </div>
</template>

<script>
import MisForm from '@/components/MisForm'
export default {
  components: { MisForm },
  data() {
    return {
      exForm: {
        staffCode: 'F1336521',
        staffName: '陳越臣',
        gender: 1,
        unitName: '周邊單位',
        workStatus: '在職',
        degree: '本科',
        major: '計算機科學與技術',
        joinDate: '2019-07-12',
        workPlace: [1],
        workContent: '前端開發，主要負責公司內部系統前端web開發。'
      },
      formHead: [
        { label: '工號', prop: 'staffCode', type: 'input' },
        { label: '姓名', prop: 'staffName', type: 'input' },
        { label: '性別', prop: 'gender', type: 'radio', settings: [{ label: '男', value: 1 }, { label: '女', value: 0 }] },
        { label: '入集團日期', prop: 'joinDate', type: 'date-picker' },
        { label: '事業處', prop: 'unitName', type: 'input' },
        { label: '在職狀態', prop: 'workStatus', type: 'input' },
        { label: '專業', prop: 'major', type: 'input' },
        { label: '工作地點', prop: 'workPlace', type: 'checkbox', span: 24, settings: [{ label: '深圳', value: 1 }, { label: '上海', value: 2 }, { label: '杭州', value: 3 }] },
        { label: '工作內容', prop: 'workContent', type: 'input', componentType: 'textarea', span: 24 }
      ]
    }
  },
  methods: {
    test() {
      console.log(this.exForm)
    }
  }
}
</script>

<style lang="scss">

</style>
