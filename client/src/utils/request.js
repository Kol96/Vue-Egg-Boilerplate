import axios from 'axios'
import { Message } from 'element-ui'
import Cookies from 'js-cookie'

import router from '@/router'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_URL, // api的base_url
  timeout: 30000 // request timeout
})

// 拦截request,设置全局请求为ajax请求
service.interceptors.request.use(
  (config) => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    const token = Cookies.get('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // Do something with request error
    Message.error('响应超时')
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 拦截响应response，并做一些错误处理
service.interceptors.response.use(
  (response) => {
    // HTTP:200 接收成功返回数据
    return Promise.resolve(response.data)
  },
  (error) => {
    console.log(error)
    console.log(error.msg)
    if (error.response) {
      error.message = error.response.data.message
      switch (error.response.status) {
        case 401: // 未登录
          router.replace({
            path: '/user/login'
          })
          break
        case 403: // 无权限
          router.replace({
            path: '/exception/403'
          })
          break
        case 500: // 内部错误
          error.message = '系统异常，请稍后再试'
          break
      }
    } else {
      error.message = '系统异常，请稍后再试'
    }
    return Promise.reject(error)
  }
)

export default service
