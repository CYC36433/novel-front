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
    <el-row class="main-title">
      章节列表
    </el-row>
    <el-row class="chapter-container">
      <ul class="chapter-list">
        <li v-for="(item,index) in liList" :key="index" @click="read(item.chapterId)">{{ item.chapterName }}</li>
      </ul>
      <el-pagination
        v-if="ChapterList && ChapterList.length"
        ref="el-pagination"
        small
        background
        style="text-align:right;margin-top:15px;"
        layout=" prev, pager, next,sizes"
        :pager-count="5"
        :total="ChapterList.length"
        :page-sizes="[20,50,200]"
        :current-page.sync="pageIndex"
        :page-size.sync="pageSize"
      />
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
      noChapterList: false,
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
      ChapterList: [],
      loading: false,
      pageIndex: 1,
      pageSize: 20
    }
  },
  computed: {
    liList() {
      return this.ChapterList.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize)
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
      this.noChapterList = false
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
        fictionApi.getChapterList(this.id).then(res => {
          this.ChapterList = res || []
          this.noChapterList = false
        }).catch(() => {
          this.noChapterList = true
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
    },
    read(val) {
      this.$router.push({
        name: 'readFiction',
        params: {
          id: this.id,
          chapterId: val
        }
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
  .result-container{
    min-height: 400px;
  }
  .chapter-container{
    .chapter-list{
      margin: 0;
      padding: 0;
      li{
        list-style: none;
        padding: 5px 0;
        border-bottom: 1px solid #eeeeee;
      }
    }
  }
}
</style>
