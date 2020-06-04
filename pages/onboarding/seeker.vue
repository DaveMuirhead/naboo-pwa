<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="6" sm="8">
        <Signup v-bind:emailError="emailError" @signup="signup"></Signup>
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
  data() {
    return {
      emailError: null
    }
  },
  methods: {
    signup($event) {
      this.$store.dispatch(
        'auth/signup',
        {
          action: 'signup',
          account_type: 'seeker',
          email: $event.email,
          full_name: $event.full_name,
          password: $event.password
        }
      )
      .catch (
        error => {
          console.log('seeker.vuew - catch with error');
          console.log('error.response.status = ' + error.response.status)
          console.log('error.response.data = ' + JSON.stringify(error.response.data))
          this.emailError = 'caught error ' + error.response.status
        //   if (error.response) {
        //     // client received an error response (5xx, 4xx)
        //     console.log('onboarding/seeker.vue :: signup - error on response')
        //     console.log(error.response)
        //   } else if (error.request) {
        //     // client never received a response, or request never left
        //     console.log('onboarding/seeker.vue :: signup - error on request')
        //     console.log(error.request)
        //   } else {
        //     // anything else
        //     console.log('onboarding/seeker.vue :: signup - unknown error')
        //     console.log(error)
        //   }
        }
        //TODO: need to redirect to seeker home page (with id) here
      )
    }
  }
};
</script>
