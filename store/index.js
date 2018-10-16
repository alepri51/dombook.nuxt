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
    },
    AUTH_REDIRECT(state, redirect) {
        debugger
        state.redirect = { ...state.redirect, ...redirect };
        redirect.from && state.history.push(redirect.from);
    }
}

export const state = () => ({
    history: [],
    //redirect: {}
})

