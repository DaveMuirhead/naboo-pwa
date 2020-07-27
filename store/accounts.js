import { createHelpers } from 'vuex-map-fields';

const { getAccountField, updateAccountField } = createHelpers({
  getterType: 'getAccountField',
  mutationType: 'updateAccountField',
});

// ============================================================
// State
// ============================================================
export const state = () => ({
  account: {
    account_type: null,
    active: false,
    email: null,
    email_verified: true,
    full_name: null,
    nickname: null,
    picture: null,
    uuid: null
  },
})

// ============================================================
// Getters
// ============================================================
export const getters = {
  getAccountField,
}

// ============================================================
// Mutations
// ============================================================
export const mutations = {
  updateAccountField,

  setAccount(state, newAccount) {
    state.account = newAccount
  },

  setAccountPicture(state, newUrl) {
    if (state.account) {
      state.account.picture = newUrl
    }
  }
}

// ============================================================
// Actions
// ============================================================
export const actions = {

  /*
   * GET /users/:uuid
   */
  async loadById({commit}, id) {
    console.log('accounts::loadById called with ' + id)
    return this.$axios
      .$get('/users/' + id)
      .then(
        response => {
          commit('setAccount', response);
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

  updatePicture({commit}, url) {
    commit('setAccountPicture', url)
  },

  saveAccountUpdates({state, commit}) {
    console.log('accounts::saveAccountUpdates called')
    return this.$axios
      .$patch('/users/' + state.account.uuid, state.account)
      .then(
        response => {
          commit('setAccount', response);
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

  cancelAccountUpdates({state, commit}) {
    console.log('accounts::cancelAccountUpdates called')
    return this.$axios
      .$get('/users/' + state.account.uuid)
      .then(
        response => {
          commit('setAccount', response);
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
