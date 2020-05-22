<template>
  <div>
    <v-row align="center" class="my-5">
      <v-col class="text-center">
        <h1
          class="display-1 font-weight-bold mb-4"
          color="primary"
        >A New Way to Find and Sell Therapy Services</h1>
        <h2 class="subheading">Join the community and get sprouting!</h2>
      </v-col>
    </v-row>

    <v-row align="center" class="my-5">
      <v-col class="text-center">
        <nuxt-link to="/onboarding">
          <v-btn color="primary">Get Started</v-btn>
        </nuxt-link>
        <nuxt-link to="/tour">
          <v-btn color="primary">Take a Tour</v-btn>
        </nuxt-link>
      </v-col>
    </v-row>
  </div>
</template>



<script>
export default {
  layout: "external",
};
</script>
