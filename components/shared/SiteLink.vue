<template>
  <NuxtLink class="site-link" :class="[size]" :to="to">{{ text }}</NuxtLink>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
    },
    text: {
      type: String,
    },
    size: {
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
.site-link {
  text-decoration: none;
  color: v-bind(color);
  position: relative;
  display: inline-block;
  overflow: hidden;

  &::before {
    content: " ";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background-color: v-bind(color);
    transform: translateX(-150%);
    transition: transform 0.5s;
  }

  &.lg {
    font-size: 56px;
    line-height: 56px;
    font-weight: 700;
    letter-spacing: -1px;
    text-transform: uppercase;
  }

  &.md {
    font-size: 20px;
    line-height: 20px;
    font-weight: 400;
    letter-spacing: -0.24px;
    text-transform: capitalize;

    &::before {
      bottom: 0;
      height: 1px;
    }
  }

  &:hover {
    &::before {
      transform: translateX(0%);
    }
  }
}
</style>