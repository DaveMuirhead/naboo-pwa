import User from '@/assets/js/User'

// ============================================================
// State
// ============================================================
export const state = () => ({
  accessToken: null,
  email: null,
  refreshToken: null,
  uuid: null,
  user: User.from(localStorage.token)
})

//https://paweljw.github.io/2017/10/vue.js-front-end-app-part-4-keeping-state-with-vuex/

// ============================================================
// Mutations
// ============================================================
export const mutations = {
  setAccessToken(state, token) {
    state.accessToken = token
  },
  setEmail(state, email) {
    state.email = email
  },
  setRefreshToken(state, token) {
    state.refreshToken = token
  },
  setUuid(state, id) {
    state.uuid = id
  },
  login(state) {
    state.user = User.from(localStorage.token)
  },
  logout(state) {
    state.user = null
  }
}

// ============================================================
// Actions
// ============================================================
export const actions = {

  identity({commit}, authData) {
    return this.$axios
      .$post("/auth/identity/callback", authData)
      .then(
        response => {
          commit('setAccessToken', response.data.token);
          commit('setEmail', response.data.email);
          commit('setUuid', response.data.uuid);
          commit('login')
          return Promise.resolve(response);
        }
      )
      .catch(
        error => {
          console.log(JSON.parse(JSON.stringify(error)));
          return Promise.reject(error);
      }
    )
  },

  logout({commit}) {
    commit('logout')
  }
}

// ============================================================
// Getters
// ============================================================
export const getters = {
  currentUser (state) {
    return state.user
  },
  isAuthenticated(state) {
    return state.accessToken != null
  }
}