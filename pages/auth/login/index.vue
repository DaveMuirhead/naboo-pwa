<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="6" sm="8">
        <Login @login="login"></Login>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Login from "@/components/login";
export default {
  layout: "nochrome",
  components: {
    Login
  },
  methods: {
    login($event) {
      this.$axios.$post("http://localhost:4004/v1/auth/identity/callback", {
        email: $event.email,
        password: $event.password
      });
    }
  }
};
</script>
