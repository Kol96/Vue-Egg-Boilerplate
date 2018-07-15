import axios from 'axios'
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
      config.headers['Authorization'] = token
    }
    return config
  },
  (error) => {
    // Do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 拦截响应response，并做一些错误处理
service.interceptors.response.use(
  (response) => {
    const data = response.data
    if (data.result) {
      return Promise.resolve(data.data)
    } else {
      const error = new Error()
      error.msg = data.message || '操作失败或错误'
      return Promise.reject(error)
    }
  },
  (error) => {
    error.msg = '系统异常，请稍后再试'
    if (error.response) {
      error.msg = error.response.data.message
    }
    if (error.response && router.currentRoute.path !== '/user/login') {
      switch (error.response.status) {
        case 401:
          router.replace({
            path: '/user/login'
          })
          error.msg = '用户未登录'
          break
        case 403:
          router.replace({
            path: '/exception/403'
          })
          error.msg = '无访问权限'
          break
        case 404:
          router.replace({
            path: '/exception/404'
          })
          error.msg = '页面不存在'
          break
        case 500:
          // router.replace({
          //   path: '/exception/500'
          // })
          error.msg = '系统异常，请稍后再试'
          break
      }
    }
    return Promise.reject(error)
  }
)

export default service
