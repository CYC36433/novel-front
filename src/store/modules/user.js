import { getToken, setToken, removeToken } from '@/utils/auth'
import userApi from '@/api/user'
import store from '../../store'
import router from '../../router'
import { constantRouterMap } from '@/router'
import { deepClone } from '@/utils'

const user = {
  state: {
    token: getToken(),
    roles: [],
    userInfo: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 登录
    login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        var formdata = new FormData()
        formdata.append('client_id', 'javaboy')
        formdata.append('client_secret', '123')
        formdata.append('username', username)
        formdata.append('password', password)
        formdata.append('grant_type', 'password')
        userApi.login(formdata).then(res => {
          if (res.access_token) {
            commit('SET_TOKEN', res.access_token)
            setToken(res.access_token)
            resolve()
          } else {
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取信息
    getInfo({ commit }) {
      return new Promise((resolve, reject) => {
        // var flag = 1 // 1.前端生成菜单 2.后端生成菜单
        var userInfo
        var roles
        // 前端生成菜单
        userApi.getInfo().then(res => {
          userInfo = res
          roles = (res.roleList && res.roleList.length && res.roleList[0].id) ? res.roleList.map(o => o.id) : [1]
          commit('SET_USERINFO', userInfo)
          commit('SET_ROLES', roles)
          store.dispatch('GenerateRoutes', roles).then(accessRoutes => {
            router.addRoutes(accessRoutes)
            router.options.routes = deepClone(constantRouterMap)
            router.options.routes.push(...accessRoutes)
          })
          resolve(roles)
        }).catch(() => {
          reject()
        })
        // 后端生成菜单
        // userApi.getInfo().then(res => {
        //   userInfo = {
        //     userName: res.userName,
        //     accountName: res.accountName,
        //     avatar: res.userImg
        //   }
        //   roles = res.roleIds
        //   commit('SET_USERINFO', userInfo)
        //   commit('SET_ROLES', roles)
        //   store.dispatch('getRoutes', res.sysMenuListVos).then(accessRoutes => {
        //     router.addRoutes(accessRoutes)
        //     router.options.routes = deepClone(constantRouterMap)
        //     router.options.routes.push(...accessRoutes)
        //   })
        //   resolve(roles)
        // }).catch(err => {
        //   reject(err)
        // })
      })
    },
    // 登出
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        store.dispatch('resetToken')
        store.dispatch('resetRoutes')
        commit('SET_USERINFO', {})
        commit('SET_ROLES', [])
        resolve()
      })
    },
    // 重置token
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
