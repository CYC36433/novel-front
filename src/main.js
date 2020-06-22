// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'babel-polyfill'
import ElementUI from 'element-ui'
import '@/style/element.css'
import '@/style/index.scss'
import '@/icons' // icon
import '@/components' // 引入全局组件
import '@/permission' // 权限
import { hasPerm } from '@/utils/hasPerm' // 按钮级别权限

Vue.use(ElementUI)
Vue.prototype.hasPerm = hasPerm

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
