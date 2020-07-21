import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import store from '@/store'

var baseIP
// baseIP = 'http://169.254.243.36:8080' // 本地调试
// baseIP = 'http://192.168.43.117:9000' // 本地调试
// baseIP = 'http://10.139.198.176:8080/rookie' // 观泰IP
// baseIP = 'http://10.139.199.167:8082' // 徐鑫IP
// baseIP = 'http://10.139.199.153:8080' // 寅龙IP
// baseIP = 'http://10.139.198.153:8080' // 从明IP
// baseIP = 'http://10.139.198.183:8080/rookie' // 永晖IP
// baseIP = 'http://10.139.198.184:8080/rookie' // 海波IP
// baseIP = 'http://10.124.131.77:8080xz' // 服務器Ip
// baseIP = baseIP + '/rookie'
// baseIP = 'https://blog.alexmmd.top/api'
// baseIP = '/api'
baseIP = process.env.VUE_APP_BASE_API

// 创建axios实例
const service = axios.create({
  baseURL: baseIP, // 请求的基本地址
  timeout: 15 * 1000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
  if (getToken()) {
    config.headers['token'] = getToken()
  }
  return config
}, error => {
  // Do something with request error
  console.error(error) // for debug
  return Promise.reject(error)
})
// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code) {
    // 请求数据不成功,弹框提示
      if (res.code !== 100 && res.code !== 101) {
      // token过期code401,返回登录页
        if (res.code === 401) {
          Message({
            message: '登录信息过期，即将跳转登录页！',
            type: 'error',
            duration: 2 * 1000
          })
          store.dispatch('resetToken')
          setTimeout(window.location.replace(`http://` + window.location.host), 2000)
        } else {
          if (res.code !== 501) {
            Message({
              message: res.message || '请求发生错误！',
              type: 'error',
              duration: 5 * 1000
            })
          }
        }
        return Promise.reject(new Error(res.message || '请求发生错误！'))
      } else {
        // 请求成功
        if (res.code === 101) {
          Message({
            message: res.message || '操作成功',
            type: 'success',
            duration: 3 * 1000
          })
        }
        return res.data
      }
    } else {
      return res
    }
  },
  error => {
    Message({
      message: '请求服务器失败！',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default service
