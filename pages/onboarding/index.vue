<template>
  <v-container>
    <v-row class="my-5">
      <v-col class="text-center">
        <h1
          class="display-1 font-weight-bold mb-4"
          color="primary"
        >A New Way to Find and Sell Therapy Services</h1>
        <h2 class="subheading">Great! Let's get started.</h2>
      </v-col>
    </v-row>

    <v-row class="my-5" justify="center">
      <v-col class="d-flex justify-center" cols="12" md="4" sm="12">
        <NuxtLink to="/onboarding/seeker">
          <v-btn color="primary">I'm Seeking Therapy Services</v-btn>
        </NuxtLink>
      </v-col>
      <v-col class="d-flex justify-center" cols="12" md="4" sm="12">
        <NuxtLink to="/onboarding/provider">
          <v-btn color="primary">I Provide Therapy Services</v-btn>
        </NuxtLink>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
};
</script>
