'use strict'

const path = require('path')
const fs = require('fs')
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller
  } = app

  // 登录认证
  // router.get('/', app.jwt, controller.home.index);

  // 登录
  router.get('/login', controller.home.login)

  // 异常
  router.get('/error', controller.home.error)

  // The "catchall" handler: for any request that doesn't
  // match one above, send back index.html file.
  router.get('*', (ctx) => {
    ctx.type = 'html'
    ctx.body = fs.createReadStream(path.join(__dirname, '..', '/client/dist/index.html'))
  })
}
