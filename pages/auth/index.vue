<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="4" sm="6">
        <v-form @submit.prevent="login">
          <v-card>
            <v-card-title class="headline">Log into UpSprout</v-card-title>
            <v-card-text>
              <!-- Email -->
              <v-text-field
                v-model="email"
                label="Email Address"
                prepend-icon="mdi-email"
                @blur="$v.email.$touch"
              ></v-text-field>
              <v-alert
                dense
                outlined
                type="error"
                v-if="$v.email.$dirty && (!$v.email.required || !$v.email.email)"
              >Please enter your email address in format: yourname@example.com</v-alert>

              <!-- Password -->
              <v-text-field
                v-model="password"
                label="Password"
                prepend-icon="mdi-lock"
                @blur="$v.password.$touch"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-alert
                dense
                outlined
                type="error"
                v-if="$v.password.$dirty && !$v.password.required"
              >Please enter your password.</v-alert>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn type="submit" color="primary" :disabled="!isFormValid">Log In</v-btn>
              <v-spacer />
            </v-card-actions>
            <v-card-text>
              <div>
                <NuxtLink to="/password/recover">Forgot your passsword?</NuxtLink>
              </div>
              <v-spacer />
              <div>
                Don't have an account?
                <NuxtLink to="/onboarding">Get Started</NuxtLink>
              </div>
            </v-card-text>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col md="4" sm="6">
        <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
          color="red"
        >Invalid email or password. Please try again.</v-snackbar>
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
      email: "",
      password: "",
      showPassword: false,
      snackbar: false,
      timeout: 3000
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    login() {
      this.$auth
        .loginWith("local", {
          data: {
            email: this.email,
            password: this.password
          } 
        })
        .then(result => {
          console.log("login succeeded with result " + result);
        })
        .catch(errors => {
          console.log("login failed with errors " + errors);
          this.snackbar = true;
        });
    }
  },
  computed: {
    isFormValid() {
      this.$v.touch
      var result =
        this.$v.email.$dirty &&
        this.$v.password.$dirty &&
        !this.$v.$anyError
      return result
    },
  }
};
</script>
