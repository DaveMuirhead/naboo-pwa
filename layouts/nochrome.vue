<template>
  <v-app id="app">
    <v-app-bar color="background" app flat>
      <nuxt-link to="/">
        <v-img :src="require('@/assets/images/logo.png')" width="150" height="60"></v-img>
      </nuxt-link>
    </v-app-bar>
    
    <v-content>
      <nuxt />
    </v-content>

    <v-footer app color="primary">
       <span class="white--text">&copy; {{ new Date().getFullYear() }} Dave Muirhead - All Rights Reserved</span>
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
