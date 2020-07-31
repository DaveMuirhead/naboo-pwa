<template>
  <div align="center">
    <vue-avatar
      :width="150"
      :height="150"
      :rotation="rotation"
      :borderRadius="200"
      :scale="scale"
      ref="vueavatar"
      @vue-avatar-editor:image-ready="onImageReady"
      :color="color"
    ></vue-avatar>
    <br />
    <v-slider v-model="scale" min="1" max="3" step="0.02" label="Zoom"></v-slider>
    <v-slider v-model="rotation" min="0" max="360" step="1" label="Rotation"></v-slider>
    <br />
    <v-btn color="primary" @click="saveClicked">Save</v-btn>
  </div>
</template>

<script>
import { VueAvatar } from "vue-avatar-editor-improved";
export default {
  components: {
    VueAvatar,
  },
  data() {
    return {
      rotation: 0,
      scale: 1,
      borderRadius: 50,
      color: [116,192,16,0.5]
    };
  },
  methods: {
    saveClicked() {
      var img = this.$refs.vueavatar.getImageScaled();
      var url = img.toDataURL();
    },
    onImageReady() {
      this.scale = 1;
      this.rotation = 0;
    },
  },
};
</script>

<style scoped>
</style>