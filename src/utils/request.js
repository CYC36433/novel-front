import axios from 'axios'
import { Message } from 'element-ui'
import { getToken, removeToken } from '@/utils/auth'
// 创建axios实例
const service = axios.create({
  baseURL: 'http://10.124.131.79:8080', // 请求的基本地址
  timeout: 15000 // 请求超时时间
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
    // 请求数据不成功,弹框提示
    if (res.code != 100) {
      // token过期code401,返回登录页
      if (res.code == 401) {
        Message({
          message: '登錄信息過期，即將跳轉登錄頁！',
          type: 'error',
          duration: 2 * 1000
        })
        removeToken()
        setTimeout(window.location.replace(`http://` + window.location.host), 2000)
      } else {
        Message({
          message: res.message || '請求發生錯誤！',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(new Error(res.message || '請求發生錯誤！'))
    } else {
    // 请求成功
      return res
    }
  },
  error => {
    console.error('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default service
