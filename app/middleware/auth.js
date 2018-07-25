'use strict'

module.exports = (options, app) => {
  return async function(ctx, next) {
    if (!ctx.session.user) {
      ctx.throw(401, '用户未登录')
    }
    await next()
  }
}
