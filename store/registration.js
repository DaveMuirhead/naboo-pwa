import { email } from "vuelidate/lib/validators"

// ============================================================
// State
// ============================================================
export const state = () => ({
  registration: null
})

// ============================================================
// Getters
// ============================================================
export const getters = {

  getRegistration (state) {
    return state.registration
  },

  getEmail(state) {
    return state.registration == null ? "" : state.registration.email
  }

}

// ============================================================
// Mutations
// ============================================================
export const mutations = {

  setRegistration(state, data) {
    state.registration = data
  },

  clearRegistration(state) {
    state.registration = null
  }

}

// ============================================================
// Actions
// ============================================================
export const actions = {

  /*
   * POST /registrations
   * {
   *   "account_type": "",
   *   "email": "",
   *   "full_name": "",
   *   "password": ""
   * }
   */
  start({commit}, userData) {
    return this.$axios
      .$post("/registrations", userData)
      .then(
        response => {
          console.log(JSON.parse(JSON.stringify(response)))
          commit('setRegistration', response);
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

  /* 
   * PATCH /registrations/:uuid
   * {
   *   "email": "",
   *   "secret": "",
   *   "uuid": ""
   * }
   */
  complete(context, userData) {
    console.log("registration.complete called with userData")
    console.log(JSON.parse(JSON.stringify(userData)))
    return this.$axios
      .$patch(
        "/registrations/" + context.state.registration.uuid, 
        {
          secret: context.state.registration.secret,
          code: userData.code
        })
      .then(
        response => {
          console.log("registration.complete succeeded with response")
          console.log(JSON.parse(JSON.stringify(response)))
          context.dispatch('user/setUser', response, { root: true })
          context.commit('clearRegistration');
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

  /*
   * GET /registrations/:uuid
   */
  continue(context) {
    return this.$axios
      .$get("/registrations/" + context.state.registration.uuid)
      .then(
        response => {
          context.commit('setRegistration', response);
          return Promise.resolve(response);
        }
      )
      .catch(
        error => {
          console.log("store.registration.continue caught error")
          console.log(JSON.parse(JSON.stringify(error)));
          return Promise.reject(error);
      }
    )
  },
 
}
