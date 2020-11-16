<template>
  <div id="readFiction">
    <!-- <el-row class="toolbar">
      <el-form size="mini" inline class="tool-form">
        <el-form-item label="字体">
          <el-select v-model="fontSize" @change="changeFontSize">
            <el-option v-for="(item,index) in fontSizeList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-row> -->
    <el-row class="novel-title">
      {{ chapterForm.chapterName }}
    </el-row>
    <el-row class="content" :style="{'font-size':`${fontSize}em`}" v-html="chapterForm.chapterContent" />
    <el-row v-if="id && chapterId" class="button-container">
      <el-button-group>
        <el-button type="primary" icon="el-icon-arrow-left" :disabled="!chapterForm.last" @click="handleClick(1)">上一章</el-button>
        <el-button type="primary" icon="el-icon-tickets" @click="handleClick(2)">目录</el-button>
        <el-button type="primary" :disabled="!chapterForm.next" @click="handleClick(3)">下一章<i class="el-icon-arrow-right el-icon--right" /></el-button>
      </el-button-group>
    </el-row>
  </div>
</template>

<script>
import fictionApi from '@/api/fiction'
export default {
  data() {
    return {
      fontSize: sessionStorage.getItem('fontSize') || 1,
      fontSizeList: [
        { label: '小', value: '0.5' },
        { label: '中', value: '1' },
        { label: '大', value: '1.5' }
      ],
      id: null,
      chapterId: null,
      chapterForm: { chapterName: '', chapterContent: '' }
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.chapterId = this.$route.params.chapterId
    this.getData()
  },
  methods: {
    getData() {
      const loading = this.$loading({
        target: '.content',
        text: '加载中'
      })
      fictionApi.getChapterContent({
        novelId: this.id,
        chapterId: this.chapterId
      }).then(res => {
        this.chapterForm = res || { chapterName: '', chapterContent: '' }
        loading.close()
      }).catch(() => {
        this.chapterForm = { chapterName: '', chapterContent: '' }
        loading.close()
      })
    },
    changeFontSize(val) {
      sessionStorage.setItem('fontSize', val)
    },
    handleClick(val) {
      if (val === 2) {
        this.$router.push({
          name: 'fictionDetail',
          params: {
            id: this.id
          }
        })
        return
      }
      var params
      if (val === 1) {
        params = this.chapterForm.last
      }
      if (val === 3) {
        params = this.chapterForm.next
      }
      this.$router.push({
        name: 'readFiction',
        params: {
          id: params.fictionId,
          chapterId: params.chapterId
        }
      })
    }
  }
}
</script>

<style lang="scss">
#readFiction{
  .toolbar{
    .tool-form{
      max-width: 960px;
      margin: 0 auto;
      .el-select{
        width: 80px;
      }
    }
  }
  .novel-title{
    font-size: 22px;
    font-weight: 600;
    margin-top: 10px;
    text-align: center;
  }
  .content{
    margin-top: 18px;
    min-height: 560px;
  }
  .button-container{
    text-align: center;
  }
}
</style>
