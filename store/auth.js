// ============================================================
// State
// ============================================================
export const state = () => ({
  userId: null,
  idToken: null,
  refreshToken: null
})

// ============================================================
// Mutations
// ============================================================
export const mutations = {
}

// ============================================================
// Actions
// ============================================================
export const actions = {

  signup(vuexContext, authData) {
    return this.$axios.$post(
      "http://localhost:4004/v1/auth/identity/callback",
      {
        email: $event.email,
        full_name: $event.fullName,
        password: $event.password,
        password_confirmation: $event.password
      }
    )
    .then(result => {
      console.log(result)
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
      console.log(result)
    })
    .catch( e => console.log(e));
  }

}

// ============================================================
// Getters
// ============================================================
export const getters = {
}