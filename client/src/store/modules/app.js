const app = {
  state: {
    sidebar: {
      opened: true
    },
    device: 'desktop'
  },
  mutations: {
    TOGGLE_SIDEBAR: (state) => {
      state.sidebar.opened = !state.sidebar.opened
    },
    CLOSE_SIDEBAR: (state) => {
      state.sidebar.opened = false
    },
    OPEN_SIDEBAR: (state) => {
      state.sidebar.opened = true
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    }
  },
  actions: {
    toggleSideBar({
      commit
    }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({
      commit
    }) {
      commit('CLOSE_SIDEBAR')
    },
    openSideBar({
      commit
    }) {
      commit('OPEN_SIDEBAR')
    },
    toggleDevice({
      commit
    }, device) {
      commit('TOGGLE_DEVICE', device)
    }
  }
}

export default app
