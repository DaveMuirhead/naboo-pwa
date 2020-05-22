<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="6" sm="8">
        <v-card>
          <v-card-title primary-title>Create Your Free Account</v-card-title>
          <v-card-subtitle>
            Already have an UpSprout account?
            <nuxt-link to="/auth">Sign In</nuxt-link>
          </v-card-subtitle>
          <v-card-text>
            <v-form @submit.prevent="submit">
              <v-text-field v-model="firstName" label="First Name" required></v-text-field>
              <v-text-field v-model="lastName" label="Last Name" required></v-text-field>
              <v-text-field v-model="email" label="Email Address" required></v-text-field>
              <v-text-field v-model="password" label="Password" required></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary">Create UpSprout Account</v-btn>
            <v-spacer />
          </v-card-actions>
          <v-card-text>
            By clicking "Sign Up" you agree to <nuxt-link to="/terms">UpSprout Terms</nuxt-link> and <nuxt-link to="/privacy">Privacy Policy</nuxt-link>.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "nochrome",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
  }
};
</script>
