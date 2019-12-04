import {constantRouterMap,asyncRouterMap} from '@/router/index'

//根据roleId过滤路由
function filterAsyncRouter(routers, role){
    const accessedRouters = routers.filter(route => {
        if(route.hidden === true){
            return true
        } 
        if(route.roles.indexOf(role) > -1) {
            if(route.children && route.children.length){
                route.children = filterAsyncRouter(route.children, role)
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
      routers: constantRouterMap, //用户所有路由,包括固定路由和addrouters
      addRouters: [] // 本用户的角色对应的路由
  },
  mutations: {
      SET_ROUTERS: (state,routers) => {
        state.addRouters = routers
        state.routers = constantRouterMap.concat(routers)
      }
  },
  actions: {
    //根据role动态生成路由
    GenerateRoutes({commit},role) {
      return new Promise(resolve => {
        var accessedRouters
        //开发环境加载全部菜单
        if(process.env.NODE_ENV != 'production'){
          accessedRouters = asyncRouterMap
        }
        //生产环境为动态菜单
        else{
          accessedRouters = filterAsyncRouter(asyncRouterMap,role)
        }
        commit('SET_ROUTERS',accessedRouters)
        global.antRouter = accessedRouters
        resolve(accessedRouters)
      })
    }
  }
}

export default permission