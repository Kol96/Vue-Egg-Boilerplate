import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/Layout/Layout'

Vue.use(Router)

// 未登录页面路由
export const constantRouterMap = [
  {
    path: '/user/login',
    hidden: true,
    component: () => import('../views/User/Login')
  }
]

// 登录后路由
export const asyncRouterMap = [
  {
    path: '/',
    component: Layout,
    hidden: true
  },
  {
    path: '/monitor',
    name: '接口监控',
    component: Layout,
    iconCls: 'el-icon-menu',
    children: [
      {
        path: '/monitor/log',
        name: '日志查询',
        iconCls: 'el-icon-menu',
        component: () => import('../views/Monitor/Log')
      }
    ]
  },
  {
    path: '/exception',
    name: '错误页',
    hidden: true,
    component: Layout,
    children: [
      {
        path: '/exception/404',
        name: '404',
        component: () => import('../views/Exception/404')
      }
    ]
  },
  {
    name: 'NotMatch',
    path: '*',
    hidden: true,
    redirect: '/exception/404'
  }
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
