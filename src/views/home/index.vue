<template>
  <div id="index">
    <el-row class="main-title">
      小说热榜
    </el-row>
    <el-row class="result-container">
      <ul v-if="dataList && dataList.length">
        <li v-for="(item,index) in dataList" :key="index">
          <div class="result-item-container">
            <div class="img-container">
              <el-image :src="item.novelIcon" :alt="item.novelName" fit="cover">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline" />
                </div>
              </el-image>
              <div class="handle-cover" @click="getDetail(item.id)" />
            </div>
            <mis-form :model="item" :form-head="itemFormHead" size="mini" :show-handle="false" />
          </div>
          <div class="result-item-message" />
        </li>
      </ul>
      <div v-else class="blank-result">暂无数据... ...</div>
    </el-row>
  </div>
</template>

<script>
import { timeFormatter } from '@/utils/formatter'
import fictionApi from '@/api/fiction'
export default {
  data() {
    return {
      dataList: [],
      itemFormHead: [
        { label: '书籍名称', prop: 'novelName' },
        { label: '简　　介', prop: 'novelIntro' },
        { label: '作　　者', prop: 'novelAuthor' },
        { label: '类　　型', prop: 'novelType', type: 'tag' },
        { label: '更新时间', prop: 'updateTime', formatter: timeFormatter }
      ]
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const loading = this.$loading({
        target: '.result-container',
        text: '加载中'
      })
      fictionApi.getHotList().then(res => {
        this.dataList = res || []
        loading.close()
      }).catch(() => {
        loading.close()
      })
    },
    getDetail(id) {
      this.$router.push({
        name: 'fictionDetail',
        params: {
          id: id
        }
      })
    }
  }
}
</script>

<style lang="scss">

</style>
