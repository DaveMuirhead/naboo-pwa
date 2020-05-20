<template>
  <v-app id="app">
    <v-app-bar color="background" app flat>
      <router-link to="/">
        <v-img :src="require('@/assets/images/icon.png')" width="175" height="70"></v-img>
      </router-link>
      <v-spacer />
      <v-btn outlined style="margin-right: 16px" color="primary" v-if="$vuetify.breakpoint.mdAndUp">
        <v-icon left>mdi-account</v-icon> Log In
      </v-btn>
      <v-btn text style="margin-right: 6px" color="primary" v-if="!$vuetify.breakpoint.mdAndUp">
        <v-icon left>mdi-account</v-icon>
      </v-btn>
      <v-btn style="margin-right: 12px" color="primary">Sign Up</v-btn>
      <v-app-bar-nav-icon />
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col md="8" sm="12">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
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