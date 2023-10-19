<template>
  <div
    class="parallax-site-image__image-wrapper"
    :class="[{ 'no-ratio': !aRatio }, customClass]"
  >
    <!-- <NuxtImg :src="src" class="site-image__image" /> -->
    <site-image :src="src" :aRatio="aRatio" />
  </div>
</template>

<script>
export default {
  name: "Parallax Site Image",
  props: {
    src: String,
    alt: String,
    aRatio: {
      type: Boolean,
      default: true,
    },
    customClass: {
      type: String,
      required: false,
      default: "",
    },
  },
};
</script>

<style scoped>
.parallax-site-image__image-wrapper {
  aspect-ratio: 396/432;
  overflow: hidden;
  will-change: transform;

  &.no-ratio {
    aspect-ratio: auto;
  }
}

.site-image__image {
  width: 100%;
  height: 150%;
  object-fit: cover;
  will-change: transform;
}
</style>