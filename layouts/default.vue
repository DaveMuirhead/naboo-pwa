<template>
  <v-app id="app">
    <v-app-bar color="background" app flat>
      <nuxt-link to="/">
        <v-img :src="require('@/assets/images/logo.png')" width="150" height="60"></v-img>
      </nuxt-link>
      <v-spacer />
      <nuxt-link to="/auth" v-if="!$auth.loggedIn">
        <v-btn outlined color="primary" class="mr-sm-2 mr-md-4">
          <v-icon
            :left="$vuetify.breakpoint.mdAndUp"
            :center="$vuetify.breakpoint.mdAndUp">mdi-account</v-icon>
            <span class="hidden-sm-and-down">Sign In</span>
        </v-btn>
      </nuxt-link>
      <div v-if="$auth.loggedIn">
        {{ $auth.user.email }}
      </div>
      <v-btn @click="$auth.logout()" v-if="$auth.loggedIn" color="primary" class="mr-sm-2 mr-md-4">
        <v-icon
          :left="$vuetify.breakpoint.mdAndUp"
          :center="$vuetify.breakpoint.mdAndUp">mdi-account</v-icon>
          <span class="hidden-sm-and-down">Sign Out</span>
      </v-btn>
      <span>&nbsp;</span>
      <nuxt-link to="/onboarding" v-if="!$auth.loggedIn">
        <v-btn color="primary" class="mr-sm-2 mr-md-4">Sign Up</v-btn>
      </nuxt-link>
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
export default {
};
</script>

<style>
#app {
  background-color: var(--v-background-base);
}
</style>
