<template>
  <div>
    <v-row align="center" class="my-5">
      <v-col class="text-center">
        <h1
          class="display-1 font-weight-bold mb-4"
          color="primary"
        >A New Way to Find and Sell Therapy Services</h1>
        <h2 class="subheading">Join the community and get sprouting!</h2>
      </v-col>
    </v-row>

    <v-row align="center" class="my-5">
      <v-col class="text-center">
        <v-btn color="primary" @click.stop="onboardingDialog = true">I'm new to UpSprout</v-btn>
        <v-dialog v-model="onboardingDialog" width="600px">
          <v-card fluid>
            <v-card-title primary-title>Great! Let's get started!</v-card-title>
            <v-card-text
              class="subtitle-1"
            >Are you seeking therapy services? Or are you a provider of therapy services?</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <nuxt-link to="/onboarding/seeker" style="margin-right: 40px;">
                <v-btn color="primary">I'm Seeking Therapy Services</v-btn>
              </nuxt-link>
              <nuxt-link to="/onboarding/provider">
                <v-btn color="primary">I Provide Therapy Services</v-btn>
              </nuxt-link>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn color="primary" @click.stop="loginDialog = true">I have an account</v-btn>
        <v-dialog v-model="loginDialog" width="600px">
          <v-card>
            <v-card-title primary-title>Okay, let's get you signed in!</v-card-title>
            <v-card-text
              class="subtitle-1"
            >Some people have both seeker and a provider accounts. In case you do, which account do you want to sign into?</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <nuxt-link to="/auth/seeker" style="margin-right: 40px;">
                <v-btn color="primary">Seeker login</v-btn>
              </nuxt-link>
              <nuxt-link to="/auth/provider">
                <v-btn color="primary">Provider login</v-btn>
              </nuxt-link>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>



<script>
export default {
  layout: "external",
  data() {
    return {
      onboardingDialog: false,
      loginDialog: false
    };
  }
};
</script>
