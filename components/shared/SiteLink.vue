<template>
  <NuxtLink
    class="site-link"
    :class="[size]"
    :to="to"
    :target="newTab ? '_blank' : '_self'"
  >
    {{ text }}</NuxtLink
  >
</template>

<script>
export default {
  props: {
    to: String,
    text: String,
    size: {
      type: String,
      default: "lg",
    },
    color: {
      type: String,
      default: "#FFF",
    },
    newTab: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
@import url("~/styles/components/shared/SiteLink.pcss");
.site-link {
  color: v-bind(color);

  &::before {
    background-color: v-bind(color);
  }
}
</style>