import Cookies from 'js-cookie'
import { loginByUsername, getUserInfo, logout } from '@/api/user'

const user = {
  state: {
    token: Cookies.get('token'),
    userInfo: null
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      if (!token) {
        Cookies.remove('token')
      }
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo)
          .then(() => {
            const token = Cookies.get('token') || '123'
            commit('SET_TOKEN', token)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((data) => {
            const { userInfo } = data
            commit('SET_USERINFO', userInfo)
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            commit('SET_TOKEN', '')
            location.reload() // 退出时自动刷新页面
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_USERINFO', null)
        resolve()
      })
    }
  }
}

export default user
