'use strict'

module.exports = (options, app) => {
  return async function (ctx, next) {
    try {
      await next()
    } catch (e) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      app.emit('error', e, this)
      const status = e.status || 500
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      let message = status === 500 && app.config.env === 'prod' ? 'Internal Server Error' : e.message
      // 处理egg-jwt中间件抛出的认证错误
      if (status === 401) {
        if (e.message === 'jwt expired') {
          message = '登录过期，请重新登录'
        } else {
          message = '用户未登录'
        }
      }
      ctx.status = status
      ctx.body = {
        status,
        message
      }
    }
  }
}
