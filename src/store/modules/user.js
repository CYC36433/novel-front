import { getToken, getInfo, removeToken, getPermission } from '@/utils/auth'
import store from '../../store'
import router from '../../router'

const user = {
  state: {
    token: getToken(),
    roles: [],
    userInfo: {}
  },
  mutations: {
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  actions: {
    getInfo({ commit }) {
      return new Promise((resolve, reject) => {
        var userInfo
        var roles
        if (process.env.NODE_ENV != 'production') {
          userInfo = { userName: '开发人员', userCode: 'Administrator' }
          roles = [1]
        } else {
          userInfo = JSON.parse(getInfo())
          roles = JSON.parse(getPermission()).roleList
        }
        commit('SET_USERINFO', userInfo)
        commit('SET_ROLES', roles)
        store.dispatch('GenerateRoutes', roles).then(() => {
          router.addRoutes(store.getters.addRouters)
          router.options.routes = router.options.routes.concat(global.antRouter)
        })
        resolve(userInfo)
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        removeToken()
        if (process.env.NODE_ENV == 'production') {
          window.location.replace(`http://` + window.location.host)
        }
        resolve()
      })
    }
  }
}

export default user
