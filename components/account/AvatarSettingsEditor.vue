<template>
  <div>
    <v-card flat>
      <v-card-text>
        <v-avatar color="primary" size="120" @click="edit()">
          <v-img v-if="selected" :src="selected"></v-img>
          <v-img v-else-if="$auth.user.avatar_url" :src="$auth.user.avatar_url"></v-img>
          <span v-else-if="initials" class="white--text headline">{{ initials }}</span>
          <v-icon v-else size="120" dark>mdi-account-circle</v-icon>
        </v-avatar>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="!selected" color="primary" @click="edit()">Edit</v-btn>
        <v-btn v-if="selected" color="primary" @click="save()">Save</v-btn>
        <v-btn v-if="selected" @click="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
    <input ref="uploader" class="d-none" type="file" accept="image/*" @change="onImageChosen" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      selectedFile: null,
      selecting: false
    };
  },
  computed: {
    initials() {
      let initials = null;
      let full_name = this.$auth.user.full_name;
      if (full_name) {
        initials = full_name
          .split(" ")
          .map(([firstLetter]) => firstLetter)
          .filter(
            (_, index, array) => index === 0 || index === array.length - 1
          )
          .join("")
          .toUpperCase();
      }
      return initials;
    },
  },
  methods: {
    edit() {
      this.selecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.selecting = false;
        },
        { once: true }
      );
      this.$refs.uploader.click();
    },
    onImageChosen(e) {
      const files = e.target.files;
      if (files && files[0]) {
        this.selectedFile = files[0]
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selected = e.target.result;
        };
        reader.readAsDataURL(this.selectedFile);
      }
    },
    save() {
      this.$store
        .dispatch("accounts/updateAvatar", this.selectedFile)
        .then(result => {
          this.selected = null;
          this.selectedFile = null;
          this.$auth.fetchUser();
        })
        .catch(response => {
          console.log(JSON.parse(JSON.stringify(response)))
        })
    },
    cancel() {
      this.selected = null;
      this.selectedFile = null;
    }
  },
};
</script>

<style scoped>
</style>