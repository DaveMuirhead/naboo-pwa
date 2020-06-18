<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="6" sm="8">
        <Signup
          v-bind:emailError="emailError" 
          v-bind:passwordError="passwordError" 
          @signup="signup"></Signup>
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
      emailError: null,
      passwordError: null
    }
  },
  methods: {
    signup($event) {
      this.emailError = null
      this.passwordError = null
      this.$store.dispatch(
        'registration/start',
        {
          account_type: 'provider',
          email: $event.email,
          full_name: $event.full_name,
          password: $event.password
        }
      )
      .then(
        result => {
          this.$router.push("/registration/confirm")
        }
      )
      .catch (
        error => {
          console.log("seeker signup failed")
          if (error.response) {
            // client received an error response (5xx, 4xx)
            var json = JSON.parse(JSON.stringify(error.response.data))
            var errors = json["errors"]

            var emailErrors = errors["email"]
            if (emailErrors && emailErrors.length) {
              this.emailError = emailErrors[0]
            }

            var passwordErrors = errors["password"]
            if (passwordErrors && passwordErrors.length) {
              this.passwordError = passwordErrors[0]
            }

          } else if (error.request) {
            // client never received a response, or request never left
            // TODO: handle network errors 
          } else {
            // anything else
            // TODO: handle unexpected errors 
          }
        }
      )
    }
  }
};
</script>
