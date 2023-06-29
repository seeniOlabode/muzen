<template>
  <a class="site-link">
    <span class="site-link__false-text">{{ text }}</span>
    <span class="site-link__hover-wrapper font-[400]">
      <span class="hover-wrapper__half">{{ text }}</span>
      <span class="hover-wrapper__half">{{ text }}</span>
    </span>
  </a>
</template>

<script>
export default {
  data() {
    return {
      text: "Studio",
    };
  },
};
</script>

<style scoped>
.site-link {
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: "";
    display: inline-block;
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    bottom: 0px;
    background: black;
    transform: translateX(-100%);
    transition: transform 0.5s cubic-bezier(0, 0, 0.18, 1);
  }

  &:hover {
    .site-link__hover-wrapper {
      transform: translateY(-50%);

      .hover-wrapper__half {
        animation: hoverStatic 0.5s;
      }
    }

    &::before {
      transform: translateX(0%);
    }
  }
}

.site-link__false-text {
  visibility: hidden;
}

.site-link__svg {
  width: 0;
  height: 0;
}

.site-link__hover-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  transition: transform 0.5s cubic-bezier(0.5, 0, 0.5, 1);
}

.hover-wrapper__half,
.site-link__false-text {
  font-size: 20px;
}
</style>