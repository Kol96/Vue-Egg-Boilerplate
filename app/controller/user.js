'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async userInfo() {
    const { ctx } = this
    // 获取token信息
    ctx.body = ctx.session.user
  }

  async login() {
    const { ctx } = this
    // TODO 参数校验
    const { username, password } = ctx.request.body
    // TODO 数据库账号密码校验
    if (username !== 'admin' || password !== '123456') {
      ctx.throw(400, '用户名或密码错误')
    }
    // session
    ctx.session.user = { username }
    ctx.session.maxAge = 0

    ctx.body = { message: '登录成功' }
  }

  async logOut() {
    const { ctx } = this
    ctx.session.user = null
    ctx.session.maxAge = 0
    ctx.body = {
      message: '退出登录成功'
    }
  }

  async notFound() {
    this.ctx.throw(404, '资源不存在')
  }

  async badRequest() {
    this.ctx.throw(400, '参数校验错误')
  }
}

module.exports = HomeController
