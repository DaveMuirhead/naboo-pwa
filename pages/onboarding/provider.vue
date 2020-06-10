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
        'auth/identity',
        {
          action: 'signup',
          account_type: 'provider',
          email: $event.email,
          full_name: $event.full_name,
          password: $event.password
        }
      )
      .then( (result) => {
        console.log('provider signup succeeded')
      })
      .catch (error => {
        console.log('provider signup failed')
        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log('onboarding/provider.vue :: signup - error on response')
          console.log(error.response)
        } else if (error.request) {
          // client never received a response, or request never left
          console.log('onboarding/provider.vue :: signup - error on request')
          console.log(error.request)
        } else {
          // anything else
          console.log('onboarding/provider.vue :: signup - unknown error')
          console.log(error)
        }
      })
      //TODO: need to redirect to provider home page (with id) here
    }
  }
};
</script>
