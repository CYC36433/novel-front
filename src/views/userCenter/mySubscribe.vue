<template>
  <div id="mySubscribe">
    <el-row class="main-title">
      订阅列表
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
              <div class="handle-cover" @click="getDetail(item.novelId)" />
            </div>
            <mis-form :model="item" :form-head="itemFormHead" size="mini" :show-handle="false" />
          </div>
          <div class="result-item-message">
            <el-button type="danger" icon="el-icon-star-off" size="small" plain :loading="loading" @click="cancelSubscribeNovel(item.novelId)">取消订阅</el-button>
          </div>
        </li>
      </ul>
      <div v-else class="blank-result">您还没有订阅小说，快去订阅吧...</div>
    </el-row>
  </div>
</template>

<script>
import fictionApi from '@/api/fiction'
export default {
  data() {
    return {
      dataList: [],
      itemFormHead: [
        { label: '书籍名称', prop: 'novelName' },
        { label: '简　　介', prop: 'novelIntro' },
        { label: '作　　者', prop: 'novelAuthor' },
        { label: '类　　型', prop: 'novelType', type: 'tag' }
      ],
      loading: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const loading = this.$loading({
        target: '.result-container',
        text: '查询中'
      })
      fictionApi.getSubscribeList().then(res => {
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
    },
    cancelSubscribeNovel(novelId) {
      this.loading = true
      fictionApi.cancelSubscribeNovel(novelId).then(res => {
        this.loading = false
        this.getData()
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss">

</style>
