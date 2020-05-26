<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="6" sm="8">
        <Signup></Signup>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Signup from '@/components/onboarding/provider/signup'
export default {
  layout: "nochrome",
  components: {
    Signup
  }
};
</script>
