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
      // const { userCode, password } = userInfo
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '1')
        setToken('1')
        resolve()
        // userApi.login({ accountName: userCode, userPwd: password }).then(res => {
        //   commit('SET_TOKEN', res.token)
        //   setToken(res.token)
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
        // var formdata = new FormData()
        // formdata.append('client_id', 'javaboy')
        // formdata.append('client_secret', '123')
        // formdata.append('username', userCode)
        // formdata.append('password', password)
        // formdata.append('grant_type', 'password')
        // userApi.logintest(formdata).then(res => {
        //   console.log(res.data.access_token)
        //   commit('SET_TOKEN', '1')
        //   userApi.messageTest(res.data.access_token).then(res2 => {
        //     console.log(res2)
        //   })
        //   setToken('1')
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },
    // 获取信息
    getInfo({ commit }) {
      return new Promise((resolve, reject) => {
        var flag = 1 // 1.前端生成菜单 2.后端生成菜单
        var userInfo
        var roles
        if (flag == 1) {
          userInfo = { userName: '开发人员', accountName: 'Administrator' }
          roles = [10]
          commit('SET_USERINFO', userInfo)
          commit('SET_ROLES', roles)
          store.dispatch('GenerateRoutes', roles).then(accessRoutes => {
            router.addRoutes(accessRoutes)
            router.options.routes = deepClone(constantRouterMap)
            router.options.routes.push(...accessRoutes)
          })
          resolve(roles)
        } else {
          userApi.getInfo().then(res => {
            userInfo = {
              userName: res.userName,
              accountName: res.accountName,
              avatar: res.userImg
            }
            roles = res.roleIds
            commit('SET_USERINFO', userInfo)
            commit('SET_ROLES', roles)
            store.dispatch('getRoutes', res.sysMenuListVos).then(accessRoutes => {
              router.addRoutes(accessRoutes)
              router.options.routes = deepClone(constantRouterMap)
              router.options.routes.push(...accessRoutes)
            })
            resolve(roles)
          }).catch(err => {
            reject(err)
          })
        }
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
