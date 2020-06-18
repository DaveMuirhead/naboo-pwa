// ============================================================
// State
// ============================================================
export const state = () => ({
  current: null
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

  setUser({commit}, user) {
    commit('setCurrent', user)
  },

  clearUser({commit}) {
    commit('clearCurrent')
  }
 
}
