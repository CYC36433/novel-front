import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from './store'
import router from './router'

NProgress.configure({ showSpinner: false })
// 登录白名单
const whiteList = ['/login', '/index', '/searchResult', '/fictionDetail']
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const hasToken = getToken()
  // 设置系统ID
  if (hasToken) {
    const hasRoles = store.getters.roles && store.getters.roles.length > 0
    if (!hasRoles) {
      try {
        await store.dispatch('getInfo')
        next({ ...to, replace: true })
      } catch (err) {
        await store.dispatch('resetToken')
        next('/login')
        NProgress.done()
      }
    } else {
      if (to.path === '/login') {
        next({ path: '/' })
        NProgress.done()
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
