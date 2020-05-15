import { constantRouterMap, asyncRouterMap } from '@/router/index'
import { isArrayHasSame } from '@/utils'

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
        // 开发环境加载全部菜单
        if (process.env.NODE_ENV != 'production') {
          accessedRouters = asyncRouterMap
        } else {
        // 生产环境为动态菜单
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        global.antRouter = accessedRouters
        resolve(accessedRouters)
      })
    }
  }
}

export default permission
