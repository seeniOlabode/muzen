<template>
  <div class="home-page">
    <home-hero />
  </div>
</template>

<script>
import { useSmoothScroll } from "~/composables/useSmoothScroll";
import { gsap } from "gsap";

export default {
  props: {
    transitioning: Boolean,
  },
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