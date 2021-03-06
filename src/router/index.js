import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)
// constantRouterMap是基本菜單，未限定role,即能进此系统就能看到的路由
export const constantRouterMap = [
  // {
  //   path: '/login',
  //   component: () => import('@/views/login'),
  //   isHidden: true
  // },
  {
    path: '/404',
    component: () => import('@/components/404'),
    isHidden: true
  },
  {
    path: '/',
    component: Layout,
    title: '首页',
    redirect: '/index',
    isHidden: true,
    children: [
      {
        path: '/index',
        component: () => import('@/views/home'),
        title: '首页信息',
        isHidden: true
      }, {
        path: '/searchResult',
        component: () => import('@/views/home/searchResult.vue'),
        title: '搜索信息',
        isHidden: true
      }, {
        name: 'fictionDetail',
        path: '/fictionDetail/:id',
        component: () => import('@/views/home/fictionDetail.vue'),
        title: '详细信息',
        isHidden: true
      }, {
        name: 'readFiction',
        path: '/readFiction/:id/:chapterId',
        component: () => import('@/views/home/readFiction.vue'),
        title: '小说阅读',
        isHidden: true
      }
    ]
  }
]
// devRouterMap是本地开发菜单，仅开发环境看到
// const devRouterMap = {
//   path: '/devCenter',
//   component: Layout,
//   title: '开发中心',
//   redirect: '/devCenter/menuManage',
//   children: [{
//     path: '/devCenter/menuManage',
//     component: () => import('@/views/devCenter/menuManage.vue'),
//     title: '菜单管理'
//   }]
// }

// if (process.env.NODE_ENV === 'development') {
//   constantRouterMap.push(devRouterMap)
// }

// asyncRouterMap限定role,具体系统具体配置该路由，然后根据cookie里的roleId动态显示菜单
export const asyncRouterMap = [
  {
    path: '/userCenter',
    component: Layout,
    title: '个人中心',
    isHidden: true,
    children: [{
      path: '/userCenter/mySubscribe',
      component: () => import('@/views/userCenter/mySubscribe.vue'),
      title: '我的订阅'
    }]
  },
  { path: '*', redirect: '/404', isHidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', //支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
