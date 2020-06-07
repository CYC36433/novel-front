import axios from 'axios'
import request from '@/utils/request'

function login(data) {
  return request.post('/login/auth', data)
}

function logintest(data) {
  return axios({
    url: '/api/api/auth-server/oauth/token',
    method: 'post',
    data: data
  })
}

function messageTest(data) {
  return request.get('/api/magazine-subscription-customer/customer/message', { params: { access_token: data }})
}

function getInfo() {
  return request.post('/login/getMyInfo')
}

const userApi = {
  login,
  getInfo,
  logintest,
  messageTest
}

export default userApi
