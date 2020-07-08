<template>
  <v-app id="app">

    <!-- Provides menu for mobile -->
    <v-navigation-drawer v-model="drawer" app disable-resize-watcher>
      <v-list>
        <template v-for="menu in menus">
          <v-list-item :key="menu.title" :to="menu.path">
            <v-list-item-action>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>{{ menu.title }}</v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <!-- Provides menu for desktop -->
    <v-app-bar color="background" app flat>
      <v-toolbar dense flat color="background">
        <!-- Logo -->
        <v-toolbar-title>
          <nuxt-link to="/">
            <v-img :src="require('@/assets/images/logo.png')" width="150" height="60"></v-img>
          </nuxt-link>
        </v-toolbar-title>
        <v-spacer />
        <!-- Menu -->
        <v-toolbar-items class="hidden-sm-and-down">
          <!-- Tour -->
          <nuxt-link to="/tour">
            <v-btn text color="primary" class="mr-sm-2 mr-md-4">Tour</v-btn>
          </nuxt-link>
          <!-- Testimonials -->
          <nuxt-link to="/testimonials">
            <v-btn text color="primary" class="mr-sm-2 mr-md-4">Testimonials</v-btn>
          </nuxt-link>
          <!-- Pricing -->
          <nuxt-link to="/pricing">
            <v-btn text color="primary" class="mr-sm-2 mr-md-4">Pricing</v-btn>
          </nuxt-link>
        </v-toolbar-items>
        <v-spacer />
        <v-toolbar-items class="hidden-sm-and-down">
          <!-- Sign In -->
          <nuxt-link to="/auth" v-if="!$auth.loggedIn">
            <v-btn outlined color="primary">
              <v-icon left>mdi-login</v-icon>
              Sign In
            </v-btn>
          </nuxt-link>
          <!-- Signed In User -->
          <div v-if="$auth.loggedIn">{{ $auth.user.email }}</div>
          <!-- Sign Out -->
          <v-btn @click="$auth.logout()" v-if="$auth.loggedIn" color="primary" class="mr-sm-2 mr-md-4">
            <v-icon left>mdi-logout</v-icon>
            Sign Out
          </v-btn>
          <span>&nbsp;</span>
          <!-- Sign Up -->
          <nuxt-link to="/onboarding" v-if="!$auth.loggedIn">
            <v-btn color="primary" class="mr-sm-2 mr-md-4">
            <v-icon left>mdi-account-plus</v-icon>
              Sign Up
            </v-btn>
          </nuxt-link> 
        </v-toolbar-items>
      </v-toolbar>
      <span class="hidden-md-and-up">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </span>
    </v-app-bar>

    <!-- Page content emitted here -->
    <v-content>
      <nuxt />
    </v-content>

    <!-- Footer -->
    <v-footer app color="primary">
      <span style="color: white">&copy; 2020 Dave Muirhead - All Rights Reserved</span>
    </v-footer>

  </v-app>
</template>

<script>
export default {
  name: "App",
    data() {
        return {
            drawer: false,
            menus: [
                { title: 'About', icon: 'mdi-information', path: '/about' },
                { title: 'Pricing', icon: 'mdi-tag', path: '/pricing' },
                { title: 'Sign In', icon: 'mdi-login', path: "/auth" },
                { title: 'Sign Up', icon: 'mdi-account-plus', path: '/onboarding' }
            ]
        };
    },
  methods: {
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    }
  }
};
</script>

<style>
#app {
  background-color: var(--v-background-base);
}
</style>
