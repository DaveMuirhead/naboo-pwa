<template>
  <v-app id="app">

    <!-- Provides menu for mobile (breakpoint sm and down) -->
    <v-navigation-drawer v-model="drawer" app right disable-resize-watcher>
      <v-list>
        <template v-for="menu in menus">
          <v-list-item :key="menu.title" :to="menu.path">
            <v-list-item-action>
              <v-icon color="primary">{{ menu.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content text-color="primary">{{ menu.title }}</v-list-item-content>
          </v-list-item>
        </template>
        <v-divider background-color="primary" color="primary" />
        <v-list-item key="signIn" to="/auth" v-if="!$auth.loggedIn">
          <v-list-item-action>
            <v-icon color="primary">mdi-login</v-icon>
          </v-list-item-action>
          <v-list-item-content text-color="primary">Sign In</v-list-item-content>
        </v-list-item>
        <v-list-item key="signOut" @click="$auth.logout()" v-if="$auth.loggedIn">
          <v-list-item-action>
            <v-icon color="primary">mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content text-color="primary">Sign Out</v-list-item-content>
        </v-list-item>
        <v-list-item key="signUp" to="/onboarding" v-if="!$auth.loggedIn">
          <v-list-item-action>
            <v-icon color="primary">mdi-account-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content text-color="primary">Sign Up</v-list-item-content>
        </v-list-item>
    </v-list>
    </v-navigation-drawer>

    <v-app-bar color="background" app flat>
      <v-toolbar dense flat color="background">
        <!-- Logo -->
        <v-toolbar-title>
          <nuxt-link to="/">
            <v-img :src="require('@/assets/images/logo.png')" width="150" height="60"></v-img>
          </nuxt-link>
        </v-toolbar-title>
        <v-spacer />
        <!-- Provides menu for desktop (breakpoint md and up) -->
        <v-toolbar-items class="hidden-sm-and-down">
          <template v-for="menu in menus">
            <nuxt-link :key="menu.title" :to="menu.path">
              <v-btn text color="primary" class="mr-sm-2 mr-md-4">{{ menu.title }}</v-btn>
            </nuxt-link>
          </template>
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
                { title: 'Tour', icon: 'mdi-information', path: '/tour' },
                { title: 'Testimonials', icon: 'mdi-information', path: '/testimonials' },
                { title: 'Pricing', icon: 'mdi-tag', path: '/pricing' },
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
