<template>
  <div id="layout">
    <navbar />
    <div class="main-container">
      <sidebar ref="Sidebar" class="Sidebar" :class="{'hidbar':hidFlag}" />
      <app-main ref="app-main" class="app-main" :class="{'app-main-w':hidFlag}" />
      <br style="clear:both;">
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AppMain from './components/AppMain'
import Footer from './components/Footer'

export default {
  components: { Navbar, AppMain, Sidebar, Footer },
  data() {
    return {
      hidFlag: false
    }
  }
}
</script>

<style lang="scss">
// $bg: rgb(217, 236, 255);
$bg: rgb(255, 255, 255);
$sidebarWidth: 160px;
$primary:#6F8EBE;
$success:#B2D25D;
$warning:#F6A960;
$danger:#EB8171;
#app{
  background: $bg;
}
.main-container{
  position: relative;
  min-height: calc(100vh - 60px);
  padding-top: 80px;
}
.Sidebar{
  display: inline-block;
  position: absolute;
  width: $sidebarWidth;
  height: 100%;
  margin-top: 2px;
}
.hidbar{
  width: 0;
}
.app-main{
  float: right;
  max-width: 1440px;
  width: calc(100% - #{$sidebarWidth});
  padding: 20px;
  margin: 0 auto;
  .el-row{
    padding: 8px;
  }
  .main-title{
    color: #6F8EBE;
  }
}
.app-main-w{
  float: none;
  width: 100%;
}
// 结果样式
.result-container{
  ul{
    margin-top: 0;
    padding-left: 0;
    li{
      list-style: none;
      margin-bottom: 20px;
    }
  }
  .result-item-container{
    display: flex;
    padding: 0 12px;
    border: 1px solid #eeeeee;
    .img-container{
      position: relative;
      width: 140px;
      height: 185px;
      margin: 10px 0;
      .el-image{
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        width: 100%;
        height: 100%;
        .image-slot{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background: #f5f7fa;
          color: #909399;
          font-size: 30px;
        }
      }
      .handle-cover{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        background-color: #000000;
        cursor: pointer;
      }
      &:hover{
        .handle-cover{
          opacity: .1;
        }
      }
    }
    .mis-form{
      flex: 1;
      padding: 0 15px;
      .mis-form-item{
        margin-bottom: 8px;
      }
    }
    .blank-result{
      color: #666666;
      text-align: center;
    }
  }
  .result-item-message{
    height: 40px;
    background: #eeeeee;
    padding: 4px 20px 0 0;
    text-align: right;
  }
  .blank-result{
    color: #666666;
    text-align: center;
  }
}

@media screen and (max-width: 670px) {
.Sidebar{
  display: none;
}
.app-main{
  width: 100%;
  padding: 5px;
}
// 结果样式
.result-container{
  .result-item-container{
    display: block;
    .mis-form{
      padding: 0;
    }
  }
  .result-item-message{
    padding: 4px 8px 0 0;
  }
}
}
</style>
