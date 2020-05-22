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
      <v-col class="d-flex justify-end" md="3" sm="8">
        <nuxt-link to="/onboarding">
          <v-btn color="primary">Get Started</v-btn>
        </nuxt-link>
      </v-col>
      <v-col class="d-flex justify-start" justify="center"  md="3" sm="8">
        <nuxt-link to="/tour">
          <v-btn color="primary">Take a Tour</v-btn>
        </nuxt-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "external",
};
</script>
