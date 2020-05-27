<template>
  <v-app id="app">
    <v-app-bar color="background" app flat>
      <NuxtLink to="/">
        <v-img :src="require('@/assets/images/logo.png')" width="150" height="60"></v-img>
      </NuxtLink>
      <v-spacer />
      <NuxtLink to="/auth/login">
        <v-btn outlined color="primary" class="mr-sm-2 mr-md-4">
          <v-icon
            :left="$vuetify.breakpoint.mdAndUp"
            :center="$vuetify.breakpoint.mdAndUp">mdi-account</v-icon>
            <span class="hidden-sm-and-down">Log In</span>
        </v-btn>
      </NuxtLink>
      <span>&nbsp;</span>
      <NuxtLink to="/onboarding">
        <v-btn color="primary" class="mr-sm-2 mr-md-4">Sign Up</v-btn>
      </NuxtLink>
    </v-app-bar>

    <v-content>
      <nuxt />
    </v-content>

    <v-footer app color="primary">
      <span style="color: white">&copy; 2020 Dave Muirhead - All Rights Reserved</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {};
</script>

<style>
#app {
  background-color: var(--v-background-base);
}
</style>