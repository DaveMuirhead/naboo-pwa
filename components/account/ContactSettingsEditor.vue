<template>
  <div>
    <div v-if="editing">
      <h3 align="center">Update Contact Information </h3>
      <form>
        <v-card flat>
          <v-card-text>
            <div>
              <label>Full Name</label>
              <v-text-field v-model="edited.full_name" dense outlined></v-text-field>
            </div>
            <div>
              <label>Nickname</label>
              <v-text-field v-model="edited.nickname" dense outlined></v-text-field>
            </div>
            <div>
              <label>Telephone</label>
              <vue-tel-input v-model="edited.phone1"></vue-tel-input>
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
              <v-input>{{ $auth.user.full_name }}</v-input>
            </div>
            <div>
              <label>Nickname</label>
              <v-input>{{ $auth.user.nickname }}</v-input>
            </div>
            <div>
              <label>Telephone</label>
              <v-input>{{ $auth.user.phone1 }}</v-input>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="edit()">Edit</v-btn>
          </v-card-actions>
        </v-card>
    </div>
  </div>
</template>

<script>
import { VueTelInput } from 'vue-tel-input';
import { createHelpers } from 'vuex-map-fields';
export default {
  components: {
    VueTelInput
  },
  data() {
    return {
      editing: false,
      edited: null,
      options: {
        phone: true,
        phoneRegionCode: 'US'
      } 
    };
  },
  methods: {
    edit() {
      this.edited = Object.assign({}, this.$auth.user);
      this.editing = true;
    },
    update() {
      this.$store
        .dispatch("accounts/updateAccount", this.edited)
        .then(result => {
          this.editing = false;
          this.edited = null;
          this.$auth.fetchUser();
        })
        .catch(response => {
          //TODO handle errors
          console.log(JSON.parse(JSON.stringify(response)))
        })
    },
    cancel() {
      this.editing = false;
      this.edited = null;
    }
  }
};
</script>

<style scoped>
</style>