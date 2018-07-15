'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    // 获取token信息
    console.log(ctx.state.user)
    const res = {
      uid: ctx.state.user.uid
    }
    ctx.helper.success({ ctx, res })
  }

  async login() {
    const { ctx } = this
    // TODO 参数校验
    // TODO 数据库账号密码校验
    // token签名
    const token = ctx.app.jwt.sign(
      {
        uid: '123456789',
        exp: Math.floor(Date.now() / 1000) + 60
      },
      ctx.app.config.jwt.secret
    )
    ctx.body = token
  }

  async error() {
    // throw new Error('error test')
    this.ctx.throw(10009, 'new error')
  }
}

module.exports = HomeController
