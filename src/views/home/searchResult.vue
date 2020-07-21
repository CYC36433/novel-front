<template>
  <div id="searchResult">
    <el-row class="main-title">
      搜索结果
    </el-row>
    <el-row class="result-container">
      <ul>
        <li v-for="(item,index) in dataList" :key="index">
          <div class="result-item-container">
            <el-image :src="item.imgUrl" :alt="item.novelName" />
            <mis-form :model="item" :form-head="itemFormHead" size="mini" :show-handle="false" />
          </div>
          <div class="result-item-message" />
        </li>
      </ul>
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
        { label: '简　　介', prop: 'novelDesc' },
        { label: '作　　者', prop: 'author' },
        { label: '类　　型', prop: 'category', type: 'tag' },
        { label: '更新时间', prop: 'updateTime' },
        { label: '最新章节', prop: 'latestChapter' }
      ]
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
    this.getData()
  },
  methods: {
    getData() {
      var params = this.$route.query
      const loading = this.$loading({
        target: '.result-container'
      })
      fictionApi.getListBySearch(params).then(res => {
        this.dataList = res
        loading.close()
      }).catch(() => {
        loading.close()
      })
    }
  }
}
</script>

<style lang="scss">
#searchResult{
  .result-container{
    ul{
      margin-top: 0;
      padding-left: 0;
      li{
        list-style: none;
        margin-bottom: 20px;
        .result-item-container{
          display: flex;
          padding: 0 12px;
          border: 1px solid #eeeeee;
          .el-image{
            width: 140px;
            height: 185px;
            margin-top: 10px;
          }
          .misForm{
            flex: 1;
            .mis-form-item{
              margin-bottom: 0;
            }
          }
        }
        .result-item-message{
          height: 40px;
          background: #eeeeee;
        }
      }
    }
  }
}
</style>
