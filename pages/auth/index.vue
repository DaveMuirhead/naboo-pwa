<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="4" sm="6">
        <Login @login="login"></Login>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col md="4" sm="6">
        <v-snackbar v-model="snackbar" :timeout="timeout" color="red">
          Invalid email or password. Please try again.
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Login from "@/components/login";
export default {
  layout: "nochrome",
  data() {
    return {
      snackbar: false,
      timeout: 3000
    }
  },
  components: {
    Login
  },
  methods: {
    login($event) {
      console.log("login($event) called with ")
      console.log(JSON.parse(JSON.stringify($event)))
      this.$auth.loginWith('local', {data: $event})
        .then(result => {
          console.log("login succeeded with result " + result);
        })
        .catch(errors => {
          console.log("login failed with errors " + errors);
          this.snackbar = true
        });
    }
  }
};
</script>
