// ============================================================
// State
// ============================================================
export const state = () => ({
})

//https://paweljw.github.io/2017/10/vue.js-front-end-app-part-4-keeping-state-with-vuex/


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

  signIn({commit, dispatch}, authData) {
    return this.$axios
      .$post("/sessions", authData)
      .then(
        response => {
          dispatch('user/setUser', response.data.user, {root:true})
          return Promise.resolve(response);
        }
      )
      .catch(
        error => {
          console.log(JSON.parse(JSON.stringify(error)));
          dispatch('user/clearUser', null, {root:true})
          return Promise.reject(error);
      }
    )
  },

  signOut({commit}) {
    return this.$axios
      .$delete("/sessions")
      .then(
        response => {
          dispatch('user/clearUser', null, {root:true})
          return Promise.resolve(response);
        }
      )
      .catch(
        error => {
          console.log(JSON.parse(JSON.stringify(error)));
          dispatch('user/clearUser', null, {root:true})
          return Promise.reject(error);
      }
    )
  },

  isAuthenticated({rootState}) {
    user = rootState.user.current
    return user != null && user.active
  }
 
}
