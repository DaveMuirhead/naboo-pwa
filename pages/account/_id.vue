<template>
  <v-row align="center" justify="center">
    <v-col md="6" sm="8">
      <v-form>
        <v-card>
          <v-card-title class="primary white--text justify-center">
            <div v-if="$auth.user.picture" style="position: relative">
              <v-avatar size="120">
                <v-img src="https://cdn.vuetifyjs.com/images/lists/3.jpg"></v-img>
              </v-avatar>
              <v-btn
                class="mx-2"
                fab
                dark
                x-small
                absolute
                bottom
                right
                color="red"
                :loading="isSelecting"
                @click="editAvatar()"
              >
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </div>
            <div v-else style="position: relative">
              <v-icon size="120" dark>mdi-account-circle</v-icon>
              <v-btn
                class="mx-2"
                fab
                dark
                x-small
                absolute
                bottom
                right
                color="red"
                :loading="isSelecting"
                @click="editAvatar()"
              >
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </div>
            <input
              ref="uploader"
              class="d-none"
              type="file"
              accept="image/*"
              @change="onFileChanged"
            />
          </v-card-title>
          <v-card-text>
            <v-text-field label="Name" name="picture" type="text"></v-text-field>
            <v-text-field label="Nickname" name="picture" type="text"></v-text-field>
            <v-text-field label="Email" name="picture" type="text"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary">Save</v-btn>
            <v-btn>Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: "application",
  data() {
    return {
      selectedFile: null,
      isSelecting: false
    };
  },
  methods: {
    editAvatar() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0];
      this.isSelecting = false;
      //preview display the image
      //upload as part of user update on save
    }
  }
};
</script>

<style scoped>
#foo {
  font-size: 64px !important;
}
</style>