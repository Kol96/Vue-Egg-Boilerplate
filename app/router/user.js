'use strict'

/**
 * 用户模块
 * @param app
 */
module.exports = (app) => {
  const { controller } = app
  const userRouter = app.router.namespace('/user')
  // 登录认证
  userRouter.post('/userInfo', app.jwt, controller.home.index)

  // 登录
  userRouter.post('/signIn', controller.home.login)

  // 异常
  userRouter.get('/not-found', controller.home.notFound)
  userRouter.get('/bad-request', controller.home.badRequest)
}
