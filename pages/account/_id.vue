<template>
  <v-card>
    <v-card-title class="primary white--text justify-center">
      <v-avatar size="120">
        <v-img src="https://cdn.vuetifyjs.com/images/lists/3.jpg"></v-img>
      </v-avatar>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field label="Name" name="picture" type="text"></v-text-field>
        <v-text-field label="Nickname" name="picture" type="text"></v-text-field>
        <v-text-field label="Email" name="picture" type="text"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  layout: 'application'
};
</script>
