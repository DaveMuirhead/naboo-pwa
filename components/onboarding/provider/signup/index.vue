<template>
  <v-card>
    <v-card-title class="headline">Create Your Free Account</v-card-title>
    <v-card-subtitle class="subtitle-1">
      Already have an UpSprout account?
      <nuxt-link to="/auth">Sign In</nuxt-link>
    </v-card-subtitle>
    <v-card-text>
      <v-form @submit.prevent="submit">
        <!-- Full Name -->
        <v-text-field
          v-model="fullName"
          label="Full Name"
          prepend-icon="mdi-account-circle"
          @blur="$v.fullName.$touch"
        ></v-text-field>
        <v-alert
          dense
          outlined
          type="error"
          v-if="$v.fullName.$dirty && !$v.fullName.required"
        >Please enter your full name.</v-alert>

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
          v-if="$v.email.$dirty && !$v.email.required"
        >Please enter your email address in format: yourname@example.com</v-alert>

        <!-- Password -->
        <v-text-field
          v-model="password"
          label="Password"
          prepend-icon="mdi-lock"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-alert
          dense
          outlined
          type="error"
          v-if="$v.password.$dirty && (!$v.password.required || $v.password.minLength)"
        >Please choose a stronger password. Try a mix of letters, numbers and symbols.</v-alert>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary">Create My Account</v-btn>
      <v-spacer />
    </v-card-actions>
    <v-card-text>
      By clicking "Sign Up" you agree to
      <nuxt-link to="/terms">UpSprout Terms</nuxt-link>and
      <nuxt-link to="/privacy">Privacy Policy</nuxt-link>.
    </v-card-text>
  </v-card>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      fullName: "",
      email: "",
      password: "",
      showPassword: false
    };
  },
  validations: {
    fullName: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      minLength: minLength(8)
    }
  }
};
</script>

<style scoped>
</style>
