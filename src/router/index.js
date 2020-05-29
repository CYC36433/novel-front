import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)
// constantRouterMap是基本菜單，未限定role,即能进此系统就能看到的路由
export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    title: '首頁',
    redirect: '/Excel/Export',
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/components/404.vue'),
    hidden: true
  },
  // 此路由为示例，具体系统开发可删除，也可换为系统所有人可看的菜单
  {
    path: '/Excel',
    component: Layout,
    title: '導入導出示例',
    redirect: '/Excel/Export',
    children: [{
      path: '/Excel/Export',
      component: () => import('@/views/Excel/export.vue'),
      title: 'Excel導出'
    }, {
      path: '/Excel/Upload',
      component: () => import('@/views/Excel/upload.vue'),
      title: 'Excel導入'
    }, {
      path: '/Excel/formexample',
      component: () => import('@/views/Excel/formexample.vue'),
      title: '表單示例'
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
// asyncRouterMap限定role,具体系统具体配置该路由，然后根据cookie里的roleId动态显示菜单
export const asyncRouterMap = [
  {
    path: '/superAdmin',
    component: Layout,
    title: '超级管理员',
    redirect: '/superAdmin/add',
    // roles为该菜单可由谁看到，是一个roleId数组，具体系统具体配置
    // 此数组暂定为Number数组
    roles: [1],
    children: [{
      path: '/superAdmin/add',
      component: () => import('@/views/superAdmin/add.vue'),
      title: '增加数据',
      roles: [1]
    }, {
      path: '/superAdmin/delete',
      component: () => import('@/views/superAdmin/delete.vue'),
      title: '删除数据',
      roles: [1]
    }]
  },
  {
    path: '/admin',
    component: Layout,
    title: '系统管理员',
    redirect: '/admin/update',
    roles: [1, 2],
    children: [{
      path: '/admin/update',
      component: () => import('@/views/admin/update.vue'),
      title: '修改数据',
      roles: [1, 2]
    }]
  },
  {
    path: '/user',
    component: Layout,
    title: '普通用户',
    redirect: '/user/query',
    roles: [1, 2, 3],
    children: [{
      path: '/user/query',
      component: () => import('@/views/user/query.vue'),
      title: '查询数据',
      roles: [1, 2, 3]
    }]
  },
  {
    path: '/public',
    component: Layout,
    title: '公共菜单',
    redirect: '/public/user',
    roles: [1, 2, 3],
    children: [{
      path: '/public/user',
      component: () => import('@/views/public/user.vue'),
      title: '所有用户可看',
      roles: [1, 2, 3]
    }, {
      path: '/public/admin',
      component: () => import('@/views/public/admin.vue'),
      title: '管理员和超级管理员可看',
      roles: [1, 2]
    }, {
      path: '/public/superAdmin',
      component: () => import('@/views/public/superAdmin.vue'),
      title: '仅超级管理员可看',
      roles: [1]
    }]
  },
  {
    path: '/devCenter',
    component: Layout,
    title: '開發中心',
    redirect: '/devCenter/menuManage',
    children: [{
      path: '/devCenter/menuManage',
      component: () => import('@/views/devCenter/menuManage'),
      title: '菜單管理'
    }]
  },
  {
    path: '/hid',
    component: Layout,
    title: '非菜單頁面',
    hidden: true,
    children: [{
      path: '/public/detail',
      component: () => import('@/views/public/detail'),
      title: '數據詳情'
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]
