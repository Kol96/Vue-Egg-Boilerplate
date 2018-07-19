'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    // 获取token信息
    ctx.body = {
      user: ctx.state.user
    }
  }

  async login() {
    const { ctx } = this
    // TODO 参数校验
    // TODO 数据库账号密码校验
    // token签名
    const token = ctx.app.jwt.sign(
      {
        uid: '123456789',
        exp: Math.floor(Date.now() / 1000) + 60 * 60
      },
      ctx.app.config.jwt.secret
    )
    ctx.body = { token }
  }

  async notFound() {
    this.ctx.throw(404, '资源不存在')
  }

  async badRequest() {
    this.ctx.throw(400, '参数校验错误')
  }
}

module.exports = HomeController
