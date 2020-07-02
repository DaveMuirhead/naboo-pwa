<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="4" sm="6">
        <v-form @submit.prevent="change">
          <v-card>
            <v-card-title class="headline">Change Password</v-card-title>
            <v-card-subtitle>
              In order to protect your account make sure your new password:
              <ul>
                <li>Is 8 characters or longer</li>
                <li>Has at least one lower case letter</li>
                <li>Has at least one upper case letter</li>
                <li>Has at least one number</li>
                <li>Has at least one special character (e.g., @, #, $, &amp;, +)</li>
              </ul>
            </v-card-subtitle>
            <v-card-text>
              <!-- Password -->
              <v-text-field
                v-model="password"
                label="New Password"
                prepend-icon="mdi-lock"
                @blur="$v.password.$touch"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :error-messages="passwordErrors"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn type="submit" color="primary" :disabled="!isFormValid">Change Password</v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  layout: "nochrome",
  props: ["passwordError"],
  data() {
    return {
      password: null,
      showPassword: false
    };
  },
  validations: {
    password: {
      required,
      strongPassword(password) {
        return (
          /[a-z]/.test(password) && // checks for a-z
          /[A-Z]/.test(password) && // checks for A-Z
          /[0-9]/.test(password) && // checks for 0-9
          /\W|_/.test(password) && // checks for special char
          password.length >= 8 // checks for length
        );
      }
    }
  },
  methods: {
    change() {
      console.log("this.$route = ")
      console.log(this.$route)
      this.$store.dispatch(
        'password/complete', {
          token: this.$route.query.token,
          password: this.password
        }
      )
      .then (
        this.$router.push("/auth")
      )
      .catch (
        error => {
          console.log("password change failed")
          if (error.response) {
            // client received an error response (5xx, 4xx)
            var json = JSON.parse(JSON.stringify(error.response.data))
            var errors = json["errors"]

            var passwordErrors = errors["password"]
            if (passwordErrors && passwordErrors.length) {
              this.passwordErrors = passwordErrors[0]
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
      this.$v.touch;
      var result = this.$v.password.$dirty && !this.$v.$anyError;
      return result;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) {
        return errors;
      } else if (!this.$v.password.required) {
        errors.push("Password is required.");
      } else if (!this.$v.password.strongPassword) {
        errors.push(
          "Please choose a stronger password with at least 8 characters, including a minimum of one each of upper and lower case letters, numbers and special characters."
        );
      } else if (this.passwordError) {
        errors.push(this.passwordError);
      }
      return errors;
    }
  }
};
</script>
