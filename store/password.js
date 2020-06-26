import { email } from "vuelidate/lib/validators"

// ============================================================
// State
// ============================================================
export const state = () => ({
})

// ============================================================
// Getters
// ============================================================
export const getters = {
}

// ============================================================
// Mutations
// ============================================================
export const mutations = {
}

// ============================================================
// Actions
// ============================================================
export const actions = {

  /*
   * POST /password-resets
   * {
   *   "email": "",
   *   "reset_form_url": ""
   * }
   */
  start(context, data) {
    console.log("password.start called with email = " + email)
    return this.$axios
      .$post("/password-resets", {
        email: data.email,
        reset_form_url: "http://localhost:3000/password/reset"
      })
      .then(
        response => {
          console.log("password.reset succeeded")
          return Promise.resolve(response);
        }
      )
      .catch(
        error => {
          console.log("password.reset failed with error")
          console.log(JSON.parse(JSON.stringify(error)));
          return Promise.reject(error);
      }
    )
  },
  /* 
   * PATCH /password-resets/:secret
   * {
   *   "password": ""
   * }
   */
  complete(context, data) {
    console.log("password.complete called with data")
    console.log(JSON.parse(JSON.stringify(data)))
    return this.$axios
      .$patch(
        "/password-resets/" + data.token, 
        {
          password: data.password
        })
      .then(
        response => {
          console.log("password.complete succeeded with response")
          console.log(JSON.parse(JSON.stringify(response)))
          return Promise.resolve(response);
        }
      )
      .catch(
        error => {
          console.log(JSON.parse(JSON.stringify(error)));
          return Promise.reject(error);
      }
    )
  }

}
