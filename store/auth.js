// ============================================================
// State
// ============================================================
export const state = () => ({
  userId: null,
  accessToken: null,
  refreshToken: null
})

// ============================================================
// Mutations
// ============================================================
export const mutations = {
  setAccessToken(state, token) {
    state.accessToken = token
  }
}

// ============================================================
// Actions
// ============================================================
export const actions = {

  signup(vuexContext, authData) {
    return this.$axios.$post(
      "http://localhost:4004/v1/auth/identity/callback",
      {
        role: $event.role,
        email: $event.email,
        full_name: $event.fullName,
        password: $event.password,
        password_confirmation: $event.password
      }
    )
    .then(result => {
      vuexContext.commit('setAccessToken', result.data.token)
    })
    .catch( e => console.log(e));

  },

  login(vuexContext, authData) {
    return this.$axios.$post(
      "http://localhost:4004/v1/auth/identity/callback",
      {
        email: authData.email,
        password: authData.password
      }
    )
    .then(result => {
      vuexContext.commit('setAccessToken', result.data.token)
    })
    .catch( e => console.log(e));
  }

}

// ============================================================
// Getters
// ============================================================
export const getters = {
  isAuthenticated(state) {
    return state.accessToken != null
  }
}