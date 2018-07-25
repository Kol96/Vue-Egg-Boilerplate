'use strict'

/**
 * 用户模块
 * @param app
 */
module.exports = (app) => {
  const { controller, middleware } = app
  const auth = middleware.auth()
  const userRouter = app.router.namespace('/user')

  // 登录
  userRouter.post('/login', controller.user.login)

  // 用户信息
  userRouter.get('/userInfo', auth, controller.user.userInfo)

  userRouter.post('/logOut', controller.user.logOut)

  // 异常
  userRouter.get('/not-found', controller.user.notFound)
  userRouter.get('/bad-request', controller.user.badRequest)
}
