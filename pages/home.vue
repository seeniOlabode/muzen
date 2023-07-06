<template>
  <div class="home-page">
    <home-hero />
  </div>
</template>

<script>
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
  visibility: hidden;
}
</style>