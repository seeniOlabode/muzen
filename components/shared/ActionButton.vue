<template>
  <button class="action-button" :class="[size, color]">
    {{ text }}
  </button>
</template>

<script>
export default {
  props: ["text", "size"],
  props: {
    text: {
      type: String,
    },
    size: {
      type: String,
      default: "md",
    },
    color: {
      type: String,
      default: "light",
    },
  },
};
</script>

<style scoped>
@import url("~/styles/components/shared/ActionButton.pcss");
.action-button {
  color: v-bind(color);

  &::before {
    background-color: v-bind(color);
  }
}
</style>