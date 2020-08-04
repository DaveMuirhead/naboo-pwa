<template>
  <div>
    <div v-if="editing">
      <h3 align="center">Update Contact Information </h3>
      <form>
        <v-card flat>
          <v-card-text>
            <div>
              <label>Full Name</label>
              <v-text-field v-model="full_name" dense outlined></v-text-field>
            </div>
            <div>
              <label>Nickname</label>
              <v-text-field v-model="nickname" dense outlined></v-text-field>
            </div>
            <div>
              <label>Telephone</label>
              <vue-tel-input v-model="phone1"></vue-tel-input>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="update">Save</v-btn>
            <v-btn @click="cancel">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </div>
    <div v-else>
        <v-card flat>
          <v-card-text>
            <div>
              <label>Full Name</label>
              <v-input>{{ full_name }}</v-input>
            </div>
            <div>
              <label>Nickname</label>
              <v-input>{{ nickname }}</v-input>
            </div>
            <div>
              <label>Telephone</label>
              <v-input>{{ phone1 ? phone1 : '(Not Set)' }}</v-input>
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
import { VueTelInput } from 'vue-tel-input';
import { createHelpers } from 'vuex-map-fields';
const { mapFields } = createHelpers({
  getterType: 'getAccountField',
  mutationType: 'updateAccountField',
});
export default {
  components: {
    VueTelInput
  },
  data() {
    return {
      editing: false,
      options: {
        phone: true,
        phoneRegionCode: 'US'
      } 
    };
  },
  computed: {
    ...mapFields('accounts', [
      'account.full_name',
      'account.nickname',
      'account.phone1'
    ]),
  },
  methods: {
    update() {
      this.$store
        .dispatch("accounts/saveAccountUpdates")
        .then(result => {
          this.editing = false;
          this.resetForm();
          this.$auth.fetchUser();
        })
        .catch(response => {
          console.log(JSON.parse(JSON.stringify(response)))
        })
    },
    cancel() {
      this.$store
        .dispatch("accounts/cancelAccountUpdates")
        .then(result => {
          this.editing = false;
        })
        .catch(response => {
          console.log(JSON.parse(JSON.stringify(response)))
        })
    }
  }
};
</script>

<style scoped>
</style>