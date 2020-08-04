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

  updateAvatar({state}, file) {
    const formData = new FormData();
    formData.append('avatar', file, file.name)
    return this.$axios
      .$patch('/users/' + state.account.uuid, formData)
      .then(
        response => {
          return Promise.resolve(response);
        }
      )
      .catch(
        error => {
          //TODO handle errors
          console.log(JSON.parse(JSON.stringify(error)));
          return Promise.reject(error);
      }
    )
  },

  updateAccount({state, commit}, data) {
    console.log('accounts::updateAccount called');
    return this.$axios
      .$patch('/users/' + state.account.uuid, data)
      .then(
        response => {
          commit('setAccount', response);
          return Promise.resolve(response);
        }
      )
      .catch(
        error => {
          //TODO handle errors
          console.log(JSON.parse(JSON.stringify(error)));
          return Promise.reject(error);
      }
    )
  },

  startEmailChange(context, newEmailAddress) {
    return this.$axios
      .$post('/users/' + context.state.account.uuid + '/email-changes', { new_email: newEmailAddress })
      .then(
        response => {
          return Promise.resolve(response);
        }
      )
      .catch(
        error => {
          //TODO handle errors
          console.log(JSON.parse(JSON.stringify(error)));
          return Promise.reject(error);
      }
    )
  },

  completeEmailChange(context, data) {
    return this.$axios
      .$patch('/users/' + context.state.account.uuid + '/email-changes', data)
      .then(
        response => {
          return Promise.resolve(response);
        }
      )
      .catch(
        error => {
          //TODO handle errors
          console.log("accounts.completeEmailChange failed with error");
          console.log(JSON.parse(JSON.stringify(error)));
          return Promise.reject(error);
      }
    )
  }

}
