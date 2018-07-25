import router from './router'
import store from './store'

const whiteList = ['/user/login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  // 免登陆
  if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    // 有无用户数据
    if (store.getters.userInfo) {
      next()
    } else {
      store
        .dispatch('GetUserInfo')
        .then(() => {
          // 拉取用户信息及路由表
          store.dispatch('GenerateRoutes').then(() => {
            // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({
              ...to,
              replace: true
            }) // hack方法 确保addRoutes已完成
          })
        })
        .catch(() => {
          store.dispatch('FedLogOut').then(() => {
            next('/user/login')
          })
        })
    }
  }
})
