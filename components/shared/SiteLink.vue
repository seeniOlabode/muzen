<template>
  <NuxtLink class="site-link" :class="[size]" :to="to"> {{ text }}</NuxtLink>
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