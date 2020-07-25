<template>
  <div id="fictionDetail">
    <el-row class="main-title">
      小说详情
    </el-row>
    <el-row class="result-container">
      <div v-if="novelForm.novelName" class="result-item-container">
        <div class="img-container">
          <el-image :src="novelForm.imgUrl" :alt="novelForm.novelName" fit="cover">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />
            </div>
          </el-image>
          <div class="handle-cover" />
        </div>
        <!-- <div class="title-container" /> -->
        <mis-form :model="novelForm" :form-head="novelFormHead" size="mini" :num="2" :show-handle="false">
          <h2 class="novel-title">{{ novelForm.novelName }}</h2>
        </mis-form>
      </div>
      <div v-if="novelForm.novelName" class="result-item-message">
        <el-button v-if="!isSubscribe" type="success" icon="el-icon-star-on" size="small" plain :loading="loading" @click="subscribeNovel">订阅</el-button>
        <el-button v-else type="danger" icon="el-icon-star-off" size="small" plain :loading="loading" @click="cancelSubscribeNovel">取消订阅</el-button>
      </div>
      <div v-if="noResult" class="blank-result">查询失败... ...</div>
    </el-row>
  </div>
</template>

<script>
import fictionApi from '@/api/fiction'
export default {
  data() {
    return {
      id: null,
      noResult: false,
      isSubscribe: 0,
      novelForm: {},
      novelFormHead: [
        // { label: '书籍名称', prop: 'novelName' },
        { label: '作　　者', prop: 'author' },
        { label: '类　　型', prop: 'category', type: 'tag' },
        { label: '更新时间', prop: 'updateTime' },
        { label: '最新章节', prop: 'latestChapter' },
        { label: '简　　介', prop: 'novelDesc', span: 24 }
      ],
      loading: false
    }
  },
  watch: {
    $route: {
      handler() {
        this.getData()
      },
      deep: true
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.getData()
    this.checkSubscribeNovel()
  },
  methods: {
    getData() {
      this.noResult = false
      if (this.id) {
        const loading = this.$loading({
          target: '.result-container',
          text: '加载中'
        })
        fictionApi.getDetail(this.id).then(res => {
          this.noResult = false
          this.novelForm = res
          loading.close()
        }).catch(() => {
          this.noResult = true
          this.novelForm = {}
          loading.close()
        })
      }
    },
    checkSubscribeNovel() {
      if (this.$store.getters.token) {
        fictionApi.checkSubscribeNovel(this.id).then(res => {
          this.isSubscribe = res || 0
        })
      } else {
        this.isSubscribe = 0
      }
    },
    subscribeNovel() {
      if (this.$store.getters.token) {
        this.loading = true
        fictionApi.subscribeNovel(this.id).then(res => {
          this.loading = false
          this.checkSubscribeNovel()
        }).catch(() => {
          this.loading = false
        })
      } else {
        this.$message.warning('请先登录！')
      }
    },
    cancelSubscribeNovel() {
      this.loading = true
      fictionApi.cancelSubscribeNovel(this.id).then(res => {
        this.loading = false
        this.checkSubscribeNovel()
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss">
#fictionDetail{
  .img-container{
    width: 160px;
    height: 215px;
  }
  .novel-title{
    color: #555555;
    margin: 5px 0 16px 2px;
  }
}
</style>
