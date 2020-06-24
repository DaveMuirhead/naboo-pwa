// ============================================================
// State
// ============================================================
export const state = () => ({
  current: null,
  loaded: false
})

// ============================================================
// Getters
// ============================================================
export const getters = {

  getCurrent(state) {
    return state.current
  },

  isActive(state) {
    return state.current != null && state.current.active
  }

}

// ============================================================
// Mutations
// ============================================================
export const mutations = {

  setCurrent(state, data) {
    state.current = data
  },

  clearCurrent(state) {
    state.current = null
  }

}

// ============================================================
// Actions
// ============================================================
export const actions = {

  loadCurrent(context) {
    console.log("user.loadCurrent called")
    return this.$axios
      .$get("/users/current")
      .then(
        response => {
          console.log("user.loadCurrent succeded with response")
          console.log(JSON.parse(JSON.stringify(response)));
          context.commit("setCurrent", response)
          return Promise.resolve(response);
        }
      )
      .catch(
        error => {
          console.log("user.loadCurrent failed with error")
          console.log(JSON.parse(JSON.stringify(error)));
          // context.commit('clearCurrent')
          return Promise.reject(error);
      }
    )
  },

  setUser({commit}, user) {
    commit('setCurrent', user)
  },

  clearUser({commit}) {
    commit('clearCurrent')
  }
 
}
