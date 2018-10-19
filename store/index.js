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

export const actions = {
    async nuxtServerInit({ state, commit, dispatch }, { app, req }) {
        return await dispatch('loadDefaults');
    },
    async loadDefaults({ state }) {
        try {
            let filters = await this.$axios.$get('filters');
            state.filters = filters;
        }
        catch(err) {
            state.filters = {};
        }
    },
    async execute(context, { cache = true, method = 'get', endpoint = '/', payload, headers, callback, repeatOnError = false }) {

        let response;

        headers = headers || {};

        let config = {
            url: endpoint,
            method,
            headers,
            cache
        };

        config.method === 'get' ? config.params = payload : config.data = payload;
        //repeatOnError && (config.repeatOnError = { ...config, callback, code: repeatOnError });

        response = await this.$axios(config);
        
        return response;
    }
}

export const state = () => ({
    history: [],
    filters: {}
    //redirect: {}
})

