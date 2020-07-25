import { constantRouterMap, asyncRouterMap, resetRouter } from '@/router'
import { isArrayHasSame } from '@/utils'
import Layout from '@/layout'
import Blank from '@/layout/components/AppMain'

// 根据roles过滤路由
function filterAsyncRouter(routers, roles) {
  const accessedRouters = routers.filter(route => {
    if (route.roles == null) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
        return (route.children && route.children.length)
      }
      return true
    }
    if (isArrayHasSame(route.roles, roles)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
        return (route.children && route.children.length)
      }
      return true
    }
    return false
  })
  return accessedRouters
}
// 根据后端返回的菜单生成菜单路由
function generateMenuRoutes(menus) {
  const accessedRouters = menus.filter(route => {
    if (route.component) {
      if (route.component === 'layout') {
        route.component = Layout
      } else {
        if (route.component === 'blank') {
          route.component = Blank
        } else {
          route.component = () => import('@/views' + route.component + '.vue')
        }
      }
    }
    if (route.children && route.children.length) {
      route.children = generateMenuRoutes(route.children)
    }
    return true
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap, // 用户所有路由,包括固定路由和addrouters
    addRouters: [] // 本用户的角色对应的路由
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    // 根据role动态生成路由
    GenerateRoutes({ commit }, roles) {
      return new Promise(resolve => {
        var accessedRouters
        accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        commit('SET_ROUTERS', accessedRouters)
        resolve(accessedRouters)
      })
    },
    getRoutes({ commit }, menus) {
      return new Promise(resolve => {
        var accessedRouters = generateMenuRoutes(menus).concat([{ path: '*', redirect: '/404', isHidden: true }])
        commit('SET_ROUTERS', accessedRouters)
        resolve(accessedRouters)
      })
    },
    resetRoutes({ commit }) {
      return new Promise(resolve => {
        commit('SET_ROUTERS', [])
        resetRouter()
        resolve()
      })
    }
  }
}

export default permission
