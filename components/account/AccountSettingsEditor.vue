<template>
  <div>
    <div v-if="editing">
      <form>
        <v-card flat>
          <v-card-text>
            <div>
              <label>Account ID</label>
              <v-input>{{ uuid }}</v-input>
            </div>
            <div>
              <label>Account Type</label>
              <v-input>{{ account_type }}</v-input>
            </div>
            <div>
              <label>Account Email</label>
              <v-text-field v-model="email" dense></v-text-field>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary">Save</v-btn>
            <v-btn @click="editing = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </div>
    <div v-else>
        <v-card flat>
          <v-card-text>
            <div>
              <label>Account ID</label>
              <v-input>{{ uuid }}</v-input>
            </div>
            <div>
              <label>Account Type</label>
              <v-input>{{ account_type }}</v-input>
            </div>
            <div>
              <label>Account Email</label>
              <v-input>{{ email }}</v-input>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="editing = !editing">Edit</v-btn>
          </v-card-actions>
        </v-card>
    </div>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields';
const { mapFields } = createHelpers({
  getterType: 'getAccountField',
  mutationType: 'updateAccountField',
});
export default {
  data() {
    return {
      editing: false,
    };
  },
  computed: {
    ...mapFields('accounts', [
      'account.uuid',
      'account.account_type',
      'account.email'
    ]),
  }
};
</script>

<style scoped>
</style>