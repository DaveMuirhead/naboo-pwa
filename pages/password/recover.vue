<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="4" sm="6">
        <v-form @submit.prevent="reset">
          <v-card>
            <v-card-title class="headline">Reset Password</v-card-title>
            <v-card-subtitle>
              <p>No worries, it happens to the best of us!<br/>
              Enter your email below and we'll send you a link to reset your password.</p>
            </v-card-subtitle>
            <v-card-text>
              <v-text-field
                v-model="email"
                label="Email Address"
                placeholder="Enter Email Address"
                @blur="$v.email.$touch"
                :error-messages="emailErrors"
              ></v-text-field>
              <p>The password reset link we send will be valid for 10 minutes.</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                type="submit"
                color="primary"
                :disabled="!isFormValid">Email Me a Reset Link</v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  layout: "nochrome",
    data() {
      return {
        email: null,
        emailError: null
    };
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    reset() {
      this.$store.dispatch(
        'password/start', {
          email: this.email
        }
      )
      .then (
        this.$router.push("/password/accepted")
      )
      .catch (
        error => {
          console.log("password reset failed")
          if (error.response) {
            // client received an error response (5xx, 4xx)
            var json = JSON.parse(JSON.stringify(error.response.data))
            var errors = json["errors"]

            var emailErrors = errors["email"]
            if (emailErrors && emailErrors.length) {
              this.emailErrors = emailErrors[0]
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
  },
  computed: {
    isFormValid() {
      this.$v.touch
      return this.$v.email.$dirty && !this.$v.$anyError
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) {
        return errors
      }
      else if (!this.$v.email.required) {
        errors.push("Please enter your email address.")
      }
      else if (this.emailError) {
        errors.push(this.emailError)
      }
      return errors;
    }
  }
};
</script>

<style scoped>
</style>
