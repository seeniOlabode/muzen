<template>
  <div class="reveal-site-image" :class="['reveal-wrapper-' + customClass]">
    <div class="reveal-site-image__cover"></div>
    <site-image :aRatio="aRatio" :src="src" :customClass="customClass" />
  </div>
</template>

<script>
export default {
  props: ["src", "aRatio", "customClass"],
};
</script>

<style scoped>
.reveal-site-image {
  position: relative;
  overflow: hidden;
}
.reveal-site-image__cover {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: var(--muzen-light-brown);
  z-index: 100;
  will-change: transform;
}
</style>