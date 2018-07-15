// 处理成功响应
exports.success = ({ ctx, res = null, message = '请求成功' }) => {
  ctx.body = {
    data: res,
    message
  }
  ctx.status = 200
}
