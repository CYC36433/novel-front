const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters
}

export default getters
