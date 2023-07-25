<template>
  <main class="home-page">
    <home-hero />
    <home-content />
  </main>
</template>

<script>
// import { useSmoothScroll } from "~/composables/useSmoothScroll";
import { gsap } from "gsap";

export default {
  props: {
    transitoned: Boolean,
  },
  setup() {},
  mounted() {},
};
</script>

<style scoped>
.home-page {
}
</style>