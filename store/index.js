export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  }
}

export const mutations = {
    PUSH_ROUTE(state, route) {
        state.history.push(route);
    }
}

export const state = () => ({
    history: []
})

