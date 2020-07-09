<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="6" sm="8">
        <v-form @submit.prevent="signup">
          <v-card>
            <v-card-title class="headline">Create Your Free Account</v-card-title>
            <v-card-subtitle class="subtitle-1">
              Already have an UpSprout account?
              <NuxtLink to="/auth/signIn">Sign In</NuxtLink>
            </v-card-subtitle>
            <v-card-text>
              <!-- Full Name -->
              <v-text-field
                v-model="fullName"
                label="Full Name"
                prepend-icon="mdi-account-circle"
                @blur="$v.fullName.$touch()"
                :error-messages="fullNameErrors"
              ></v-text-field>

              <!-- Email -->
              <v-text-field
                v-model="email"
                label="Email Address"
                prepend-icon="mdi-email"
                @blur="$v.email.$touch()"
                :error-messages="emailErrors"
              ></v-text-field>

              <!-- Password -->
              <v-text-field
                v-model="password"
                label="Password"
                prepend-icon="mdi-lock"
                @blur="$v.password.$touch()"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :error-messages="passwordErrors"
              ></v-text-field>In order to protect your account make sure your password:
              <ul>
                <li>Is 8 characters or longer</li>
                <li>Has at least one lower case letter</li>
                <li>Has at least one upper case letter</li>
                <li>Has at least one number</li>
                <li>Has at least one special character (e.g., @, #, $, &amp;, +)</li>
              </ul>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn type="submit" color="primary">Create My Account</v-btn>
              <v-spacer />
            </v-card-actions>
            <v-card-text>
              By clicking "Create My Account" you agree to
              <NuxtLink to="/about/terms">UpSprout Terms</NuxtLink>and
              <NuxtLink to="/about/privacy">Privacy Policy</NuxtLink>.
            </v-card-text>
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
  data() {
    return {
      fullName: null,
      email: null,
      emailError: null,
      password: null,
      passwordError: null,
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
      // TODO: notRegistered gets invoked on every @input event - NEED TO DEBOUNCE
      notRegistered(email) {
        console.log('notRegistered called')
        if (email === '') return true;
        return this.$axios
          .$get("/users/email/" + encodeURIComponent(email))
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
      console.log('is iOS = ' + vm.$browserDetect.isIOS)
      this.$v.$touch()
      if (!this.$v.$invalid) {
        console.log("calling register")
        this.emailError = null;
        this.passwordError = null;
        this.$store
          .dispatch("registration/start", {
            account_type: this.$route.params.account_type,
            email: this.email,
            full_name: this.full_name,
            password: this.password
          })
          .then(result => {
            this.$router.push({
              path: "/registration/confirm",
              params: { account_type: this.$route.params.account_type }
            });
          })
          .catch(error => {
            console.log("seeker signup failed with error");
            console.log(JSON.parse(JSON.stringify(error)))
            if (error.response) {
              // client received an error response (5xx, 4xx)
              var json = JSON.parse(JSON.stringify(error.response.data));
              var errors = json["errors"];

              var emailErrors = errors["email"];
              if (emailErrors && emailErrors.length) {
                this.emailError = emailErrors[0];
              }

              var passwordErrors = errors["password"];
              if (passwordErrors && passwordErrors.length) {
                this.passwordError = passwordErrors[0];
              }
            } else if (error.request) {
              // client never received a response, or request never left
              // TODO: handle network errors
            } else {
              // anything else
              // TODO: handle unexpected errors
            }
          });
      }
    }
  },
  computed: {
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
        errors.push('Please choose a stronger password.')
      }
      else if (this.passwordError) {
        errors.push(this.passwordError);
      }
      return errors;
    }
  }
};
</script>
