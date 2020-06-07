<template>
  <v-form @submit.prevent="signup">
    <v-card>
      <v-card-title class="headline">Create Your Free Account</v-card-title>
      <v-card-subtitle class="subtitle-1">
        Already have an UpSprout account?
        <NuxtLink to="/auth/login">Log In</NuxtLink>
      </v-card-subtitle>
      <v-card-text>
        <!-- Full Name -->
        <v-text-field
          v-model="fullName"
          label="Full Name"
          prepend-icon="mdi-account-circle"
          @blur="$v.fullName.$touch"
          :error-messages="fullNameErrors"
        ></v-text-field>

        <!-- Email -->
        <v-text-field
          v-model="email"
          label="Email Address"
          prepend-icon="mdi-email"
          @blur="$v.email.$touch"
          :error-messages="emailErrors"
        ></v-text-field>

        <!-- Password -->
        <v-text-field
          v-model="password"
          label="Password"
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
        <v-btn 
          type="submit" 
          color="primary"
          :disabled="!isFormValid">Create My Account</v-btn>
        <v-spacer />
      </v-card-actions>
      <v-card-text>
        By clicking "Create My Account" you agree to
        <NuxtLink to="/about/terms">UpSprout Terms</NuxtLink>and
        <NuxtLink to="/about/privacy">Privacy Policy</NuxtLink>.
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  props: ['emailError', 'passwordError'],
  data() {
    return {
      fullName: null,
      email: null,
      password: null,
      showPassword: false
    };
  },
  validations: {
    fullName: {
      required
    },
    email: {
      required,
      email,
      notRegistered(email) {
        if (email === '') return true
        return this.$axios
          .$get("/auth/user/email/" + encodeURIComponent(email))
          .then((response) => {
            // status == 200 means email exists
            return response.status == 200;
          })
          .catch((error) => {
            // anything else don't bug the user; we'll catch issues on submit
            return true;
          });
      }
    },
    password: {
      required,
      strongPassword(password) {
        return (
          /[a-z]/.test(password) && // checks for a-z
          /[A-Z]/.test(password) && // checks for A-Z
          /[0-9]/.test(password) && // checks for 0-9
          /\W|_/.test(password) &&  // checks for special char
          password.length >= 8      // checks for length
        )
      }
    }
  },
  methods: {
    signup() {
      this.$emit('signup', {
        email: this.email,
        full_name: this.fullName,
        password: this.password
      })
    }
  },
  computed: {
    isFormValid() {
      this.$v.touch
      var result =
        this.$v.fullName.$dirty &&
        this.$v.email.$dirty &&
        this.$v.password.$dirty &&
        !this.$v.$anyError
      return result
    },
    fullNameErrors() {
      return (this.$v.fullName.$dirty && !this.$v.fullName.required)
        ? ['Please enter your full name.']
        : [];
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) {
        return errors;
      }
      else if (!this.$v.email.required) {
        errors.push('Email is required.')
      }
      else if (!this.$v.email.email) {
        errors.push('Email must be in the format you@yourco.com')
      }
      else if (!this.$v.email.notRegistered) {
        errors.push('This email is already registered.')
      }
      else if (this.emailError) {
        errors.push(this.emailError);
      }
      console.log('signup emailErrors returning')
      console.log(errors)
      return errors;
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) {
        return errors;
      }
      else if (!this.$v.password.required) {
        errors.push('Password is required.')
      }
      else if (!this.$v.password.strongPassword) {
        errors.push('Please choose a stronger password with at least 8 characters, including a minimum of one each of upper and lower case letters, numbers and special characters.')
      }
      else if (this.passwordError) {
        errors.push(this.passwordError);
      }
      console.log('signup passwordErrors returning')
      console.log(errors)
      return errors;
    }
  }
};
</script>

<style scoped>
</style>
