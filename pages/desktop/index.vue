<template>
  <v-container>
    <v-row class="my-5">
      <v-col>
        <h1 class="display-3 font-weight-bold mb-4" color="primary">Desktop</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'application',
  middleware: 'auth'
};
</script>
