<template>
  <div class="scrollbar__container">
    <div
      class="scrollbar__thumb"
      :style="{
        height: `${thumbHeight}px`,
        transform: `translateY(${thumbTransform}px)`,
        opacity: thumbOpacity,
      }"
    ></div>
  </div>
</template>

<script>
import { select } from "@/utils/utils";
import { emitter as $eventBus } from "../../plugins/event-bus.js";
import useMuzenEnter from "../../composables/useMuzenEnter";

export default {
  setup(props) {
    const thumbHeight = ref(0);
    const thumbTransform = ref(0);
    const thumbOpacity = ref(0);
    let thumbOpacityTimeout = null;
    let killLastListener = null;
    let htmlEl = null;

    function setScrollbar() {
      if (killLastListener) {
        killLastListener();
        killLastListener = null;
      }
      thumbHeight.value =
        (window.innerHeight / htmlEl.scrollHeight) * window.innerHeight;
      thumbHeight.value =
        thumbHeight.value === window.innerHeight ? 0 : thumbHeight.value;
      killLastListener = useMuzenEventListener(window, "scroll", () => {
        if (thumbOpacityTimeout) {
          clearTimeout(thumbOpacityTimeout);
        }
        thumbOpacityTimeout = setTimeout(() => {
          thumbOpacity.value = 0;
        }, 1000);
        thumbOpacity.value = 1;
        thumbTransform.value =
          (htmlEl.scrollTop / (htmlEl.scrollHeight - window.innerHeight)) *
          (window.innerHeight - thumbHeight.value);
      });
      useMuzenEventListener(window, "resize", () => {
        thumbHeight.value =
          (window.innerHeight / htmlEl.scrollHeight) * window.innerHeight;
        thumbHeight.value =
          thumbHeight.value === window.innerHeight ? 0 : thumbHeight.value;
      });
    }

    useMuzenEnter(() => {
      setTimeout(setScrollbar, 500);
    });

    onMounted(() => {
      htmlEl = select("html");
      $eventBus.on("scrollbar-page-in", setScrollbar);
    });

    return {
      thumbHeight,
      thumbTransform,
      thumbOpacity,
    };
  },
};
</script>

<style scoped>
.scrollbar__container {
  z-index: 1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  width: 12px;
  display: flex;
  justify-content: center;
}

.scrollbar__thumb {
  width: 6px;
  background: var(--muzen-dark-brown);
  border-radius: 8px;
  transition: opacity 0.2s;
  /* cursor: grab; */
}

.scrollbar__thumb:hover {
  opacity: 1 !important;
  /* scale: 1.05; */
}
</style>