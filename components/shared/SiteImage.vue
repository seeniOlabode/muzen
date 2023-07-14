<template>
  <div class="site-image__image-wrapper" :class="{ 'no-ratio': !aRatio }">
    <NuxtImg :src="src" class="site-image__image" />
  </div>
</template>

<script>
export default {
  props: {
    src: String,
    aRatio: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.site-image__image-wrapper {
  aspect-ratio: 396/432;
  overflow: hidden;

  &.no-ratio {
    aspect-ratio: auto;
  }
}

.site-image__image {
  width: 150%;
  height: 150%;
  object-fit: cover;
}
</style>