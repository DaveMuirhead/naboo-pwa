<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="6" sm="8">
        <Signup @signup="signup"></Signup>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Signup from "@/components/signup";
export default {
  layout: "nochrome",
  components: {
    Signup
  },
  methods: {
    signup($event) {
      this.$store.dispatch(
        'auth/signup',
        {
          role: 'provider',
          email: $event.email,
          full_name: $event.fullName,
          password: $event.password,
          password_confirmation: $event.password
        }
      )
      //TODO: need to redirect to provider home page (with id) here
    }
  }
};
</script>
