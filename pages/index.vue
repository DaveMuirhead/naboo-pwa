<template>
  <v-card class="elevation-12">
    <v-card-title primary-title class="justify-center">Let's Get Started</v-card-title>
    <v-card-text>
      <v-container>
        <v-row align="stretch" justify="space-around" class="d-flex flex-wrap">
          <v-col>
            <v-card outlined min-width="300px">
              <v-card-title>I need a therapist</v-card-title>
              <v-card-text>Start your free search for therapy in your area.</v-card-text>
              <v-card-actions>
                <v-spacer />
                <router-link to="/onboarding/seeker">
                  <v-btn color="primary">Find Therapy</v-btn>
                </router-link>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col>
            <v-card outlined min-width="300px">
              <v-card-title>I need therapy clients</v-card-title>
              <v-card-text>Create a free profile and find therapy clients in your area</v-card-text>
              <v-card-actions>
                <v-spacer />
                <router-link to="/onboarding/provider">
                  <v-btn color="primary">Find Clients</v-btn>
                </router-link>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: "landing"
};
</script>
