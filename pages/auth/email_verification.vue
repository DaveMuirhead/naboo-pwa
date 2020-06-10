<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="4" sm="6">
        <v-form @submit.prevent="login">
          <v-card>
            <v-card-title class="headline">Confirm Email Address</v-card-title>
            <v-card-subtitle>Please check for an email containing a verification code and enter it in the field below. The verification code is valid for 10 minutes.</v-card-subtitle>
            <v-card-text>
              <v-text-field
                v-model="code"
                label="Verification Code"
                placeholder="Enter Verification Code"
                @blur="$v.code.$touch"
                :error-messages="codeErrors"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn type="submit" color="primary">Confirm</v-btn>
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
      code: null
    };
  },
  validations: {
    code: {
      required
    }
  },
  computed: {
    isFormValid() {
      this.$v.touch
      return this.$v.code.$dirty && !this.$v.$anyError
    },
    codeErrors() {
      return (this.$v.code.$dirty && !this.$v.code.required)
        ? ['Please enter the confirmation code.']
        : [];
    }
  }
};
</script>

<style scoped>
</style>
