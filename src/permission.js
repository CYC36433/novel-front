import {getToken,setProjId} from '@/utils/auth'
import router from './router'
import store from './store'

router.beforeEach(async(to,from,next) => {
  /**开发环境 development */
  if(process.env.NODE_ENV != 'production'){
    if(!store.getters.role) {
      await store.dispatch('getInfo')
      next({...to,replace:true})
    } else {
      next()
    }
  }
  /**生产环境 production */
  else{
    //设置系统ID
    setProjId(5)
    //已登录
    if(getToken()){
      // console.log(store.getters.role);
      if(!store.getters.role) {
        await store.dispatch('getInfo')
        next({...to,replace:true})
      } else {
        next()
      }
    }
    //未登录,回到统一登录页面
    else {
      next({
      path:(window.location.replace(`http://`+window.location.host))
      })
    }
  }
})

router.afterEach(() => {

})