<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Get Started</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">Location</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 3" step="3">Phone Number</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="4">Specialties</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <GettingStarted></GettingStarted>
        <v-btn color="primary" @click="e1 = 2">Continue</v-btn>
        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <Location></Location>
        <v-btn color="primary" @click="e1 = 3">Continue</v-btn>
        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <Phone></Phone>
        <v-btn color="primary" @click="e1 = 4">Continue</v-btn>
        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="4">
        <Specialties></Specialties>
        <v-btn color="primary" @click="e1 = 1">Continue</v-btn>
        <v-btn text>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>


<script>
import GettingStarted from "@/components/onboarding/provider/getting-started";
import Location from "@/components/onboarding/provider/location";
import Phone from "@/components/onboarding/provider/phone";
import Specialties from "@/components/onboarding/provider/specialties";
export default {
  layout: "landing",
  data() {
    return {
      e1: 1
    };
  },
  components: {
    GettingStarted,
    Location,
    Phone,
    Specialties
  }
};
</script>
