<template>
  <v-container>
    <v-row class="my-5">
      <v-col class="text-center">
        <h1
          class="display-1 font-weight-bold mb-4"
          color="primary"
        >A New Way to Find and Sell Therapy Services</h1>
        <h2 class="subheading">Join the community and get sprouting!</h2>
      </v-col>
    </v-row>

    <v-row class="my-5" justify="center">
      <v-col class="d-flex justify-center" md="3" sm="8">
        <nuxt-link to="/onboarding">
          <v-btn color="primary">Get Started</v-btn>
        </nuxt-link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <nuxt-link to="/about">
          <v-btn color="primary">Take a Tour</v-btn>
        </nuxt-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'default',
  middleware: 'authenticated'
  // data() {
  //   if (this.$auth.loggedIn) {
  //     this.$nuxt.setLayout('application');
  //   }
  //   else {
  //     this.$nuxt.setLayout('default');
  //   }
  // }
};
</script>
