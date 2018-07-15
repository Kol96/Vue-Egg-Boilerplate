'use strict'

module.exports = (options, app) => {
  return async function(ctx, next) {
    try {
      await next()
    } catch (e) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      app.emit('error', e, this)
      const status = e.status
      let message = e.message
      // 处理用户认证错误
      if (status === 401) {
        ctx.status = 401
        if (e.message === 'jwt expired') {
          message = '登录超时'
        } else {
          message = '用户未登录'
        }
      }
      ctx.body = {
        message: message
      }
    }
  }
}
