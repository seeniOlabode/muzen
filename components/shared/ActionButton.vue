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
.action-button {
  font-weight: 700;
  position: relative;
  overflow: hidden;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  padding: 4px 0;
  color: v-bind(color);
  display: inline-block;
  &.md {
    font-size: 32px;
    line-height: 30px;
  }

  &.light {
    color: #faf7f0;

    &::after {
      background-color: #faf7f0;
    }
  }

  &.dark {
    color: #1c1816;

    &::after {
      background-color: #1c1816;
    }
  }

  &::after {
    content: " ";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 4px;
    height: 2px;
    transform: translateX(-100%);
    transition: transform 0.5s;
  }

  &:hover {
    /* .action-button__transition-wrapper {
      transform: translateY(-50%);
    } */
    &::after {
      transform: translateX(0%);
    }
  }
}

/* .action-button__false-text {
  visibility: hidden;
  display: inline-block;
}

.action-button__transition-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
} */
</style>