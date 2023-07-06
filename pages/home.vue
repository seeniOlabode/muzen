<template>
  <div class="home-page">
    <home-hero />
  </div>
</template>

<script>
import { useSmoothScroll } from "~/composables/useSmoothScroll";

export default {
  setup() {
    if (process.client) {
      useSmoothScroll({
        gsapScroll: false,
      });
    }
  },
};
</script>

<style scoped>
.home-page {
  position: absolute;
  top: 0;
}
</style>