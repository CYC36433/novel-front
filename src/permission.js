import { getToken, setProjId } from '@/utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from './store'
import router from './router'

NProgress.configure({ showSpinner: false })

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const hasToken = getToken()
  // 设置系统ID
  setProjId(1)
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
      if (to.path == '/login') {
        next('/')
        NProgress.done()
      } else {
        next()
        NProgress.done()
      }
    }
  } else {
    if (to.path == '/login') {
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
