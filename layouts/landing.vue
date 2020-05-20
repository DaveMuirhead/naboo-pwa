<template>
  <v-app id="app">
    <v-content>
      <v-img :src="require('@/assets/images/icon.png')" width="300" height="120"></v-img>
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col md="8" sm="12" >
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      fixed: false
    };
  }
};
</script>

<style>
#app {
  background-color: var(--v-background-base);
}
</style>