const getters = {
  sidebar: (state) => state.app.sidebar,
  token: (state) => state.user.token,
  addRouters: (state) => state.permission.addRouters,
  userInfo: (state) => state.user.userInfo
}

export default getters
