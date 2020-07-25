import request from '@/utils/request'

function login(data) {
  return request.post('/auth-server/oauth/token', data)
}

function getInfo() {
  return request.get('/novel-subscription-user/getMyUserInfo/roles')
}
// 注册
function signUp(data) {
  return request.post('/novel-subscription-user/signUp/record', data)
}

const userApi = {
  login,
  getInfo,
  signUp
}

export default userApi
