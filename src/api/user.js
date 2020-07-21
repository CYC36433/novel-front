import request from '@/utils/request'

function login(data) {
  return request.post('/login/auth', data)
}

function messageTest(data) {
  return request.get('/api/magazine-subscription-customer/customer/message', { params: { access_token: data }})
}

function getInfo() {
  return request.post('/login/getMyInfo')
}
// 注册
function signUp(data) {
  return request.post('/novel-subscription-user/signUp/record', data)
}

const userApi = {
  login,
  getInfo,
  messageTest,
  signUp
}

export default userApi
