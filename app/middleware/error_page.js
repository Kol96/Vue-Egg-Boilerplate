'use strict'

const path = require('path')
const fs = require('fs')

module.exports = () => {
  return async function errorPage(ctx, next) {
    await next()
    if (ctx.status === 404 && !ctx.body) {
      if (ctx.acceptJSON) {
        ctx.status = 404
        ctx.body = { message: '请求接口不存在' }
      } else {
        // The "catchall" handler: for any request that doesn't
        // match one above, send back index.html file.
        // Vue-router mode: 'history;
        ctx.type = 'html'
        ctx.body = fs.createReadStream(path.join(__dirname, '../../', '/client/dist/index.html'))
      }
    }
  }
}
