<template>
  <v-row align="center" justify="center">
    <v-col class="text-center" cols="12">

      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1
            class="display-2 font-weight-bold mb-4"
            color="primary"
          >A New Way to Find and Sell Therapy Services</h1>
          <h2 class="subheading">Join the community and get sprouting!</h2>
        </v-col>
      </v-row>

      <v-row align="center" justify="center" style="margin-top: 200px;">
        <v-col cols="12">
          <nuxt-link to="/onboarding" style="margin-right: 40px;">
            <v-btn color="primary">I'm New to UpSprout</v-btn>
          </nuxt-link>
          <nuxt-link to="/onboarding/provider">
            <v-btn color="primary">I Already Have an Account</v-btn>
          </nuxt-link>
        </v-col>
      </v-row>

    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: "external"
};
</script>
