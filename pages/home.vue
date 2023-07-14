<template>
  <div class="home-page">
    <home-hero />
    <home-content />
  </div>
</template>

<script>
// import { useSmoothScroll } from "~/composables/useSmoothScroll";
import { gsap } from "gsap";

export default {
  props: {
    transitoned: Boolean,
  },
  setup() {},
};
</script>

<style scoped>
.home-page {
}
</style>