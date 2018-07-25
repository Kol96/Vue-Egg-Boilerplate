import { loginByUsername, getUserInfo, logout } from '@/api/user'

const user = {
  state: {
    userInfo: null
  },

  mutations: {
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, user) {
      return new Promise((resolve, reject) => {
        loginByUsername(user)
          .then(() => {
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
          .then((user) => {
            commit('SET_USERINFO', user)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 登出
    LogOut() {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
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
        commit('SET_USERINFO', null)
        resolve()
      })
    }
  }
}

export default user
