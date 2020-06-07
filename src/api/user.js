import request from '@/utils/request'

function login(data) {
  return request.post('/login/auth', data)
}

function getInfo() {
  return request.post('/login/getMyInfo')
}

const userApi = {
  login,
  getInfo
}

export default userApi
