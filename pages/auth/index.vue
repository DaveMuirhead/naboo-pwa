<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="4" sm="6">
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
      this.$store.dispatch(
        'auth/login',
        {
          email: $event.email,
          password: $event.password
        }
      ).then(() => {
        this.$router.push("/")
      })
    }
  }
};
</script>
