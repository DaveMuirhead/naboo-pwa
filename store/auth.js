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
  setUserId(state, id) {
    state.userId = id
  },
  setAccessToken(state, token) {
    state.accessToken = token
  }
}

// ============================================================
// Actions
// ============================================================
export const actions = {

  signup(vuexContext, authData) {
    console.log('auth.signup called with accountType ' + authData.account_type)
    return this.$axios
      .$post("/auth/identity/callback", authData)
      .then(
        response => {
          console.log('store/auth.js - signup success');
          console.log(error);
          vuexContext.commit('setUserId', response.data.email);
          vuexContext.commit('setAccessToken', response.data.token);
          return response;
        }
      )
      .catch(
        error => {
          console.log('error.response.status = ' + error.response.status)
          // console.log('store/auth.js - signup error');
          // console.log(JSON.parse(JSON.stringify(error)));
          return Promise.reject(error);
      }
    )
  },

  login(vuexContext, authData) {
    console.log('auth.login called')
    this.$axios
    .$post("/auth/identity/callback", authData)
    .then(
      (response) => {
        vuexContext.commit('setUserId', response.data.email);
        vuexContext.commit('setAccessToken', response.data.token);
      },
      (error) => {
        console.log(JSON.parse(JSON.stringify(error)));
        return Promise.reject(error);
      }
    )
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