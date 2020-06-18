<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="6" sm="6">
        <v-form @submit.prevent="next">
          <v-card>
            <v-card-title class="headline">Confirm Email Address Update</v-card-title>
            <v-card-subtitle>An email with a verification code was just sent to {{ emailAddress }}. Please enter the code found on the email in the field below.</v-card-subtitle>
            <v-card-text>
              <v-text-field
                v-model="code"
                label="Verification Code"
                placeholder="Enter Verification Code"
                @blur="$v.code.$touch"
                :error-messages="codeErrors"
              ></v-text-field>
              <p>The verification code we sent is valid for 10 minutes. <nuxt-link to="#" @click.native="resendCode()">Send me another code.</nuxt-link></p>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn type="submit" color="primary">Next</v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  layout: "nochrome",
    data() {
      return {
        code: null,
        codeError: null
    };
  },
  validations: {
    code: {
      required
    }
  },
  methods: {
    resendCode() {
      alert('not implemented yet')
    },
    next() {
      this.codeError = null
      this.$store.dispatch(
        'user/completeEmailChange',
        {
          code: this.code
        }
      )
      .then(
        result => {
          this.$router.push("/")
        }
      )
      .catch (
        error => {
          console.log("email update verification failed")
          if (error.response) {
            // client received an error response (5xx, 4xx)
            var json = JSON.parse(JSON.stringify(error.response.data))
            var errors = json["errors"]

            var codeErrors = errors["code"]
            if (codeErrors && codeErrors.length) {
              this.codeErrors = codeErrors[0]
            }
          } else if (error.request) {
            // client never received a response, or request never left
            // TODO: handle network errors 
          } else {
            // anything else
            // TODO: handle unexpected errors 
          }
        }
      )    }
  },
  computed: {
    isFormValid() {
      this.$v.touch
      return this.$v.code.$dirty && !this.$v.$anyError
    },
    codeErrors() {
      const errors = []
      if (!this.$v.code.$dirty) {
        return errors
      }
      else if (!this.$v.code.required) {
        errors.push("Please enter the confirmation code.")
      }
      else if (this.codeError) {
        errors.push(this.codeError)
      }
      console.log('codeErrors returning')
      console.log(errors)
      return errors;
    },
    emailAddress() {
      return this.$store.getters['registration/email']
    }
  }
};
</script>

<style scoped>
</style>
