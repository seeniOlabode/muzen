<template>
  <div
    class="site-preloader__counter"
    :class="{ mobile: mobile }"
    ref="counterEl"
  >
    <div class="counter__wrapper">
      <span class="wrapper__false-text">000</span>
      <Transition name="loader-counter" @enter="onEnter">
        <div class="percent-check-point" :key="currentPercentCheckpoint">
          <span
            class="hundreds"
            :style="{
              visibility:
                currentPercentCheckpoint != '100' ? 'hidden' : 'visible',
              width: currentPercentCheckpoint != '100' ? '0' : 'auto',
            }"
          >
            {{ getPlaceValue(currentPercentCheckpoint, 3) }}
          </span>

          <span
            class="tens"
            :style="{
              visibility:
                parseInt(currentPercentCheckpoint, 10) < 10
                  ? 'hidden'
                  : 'visible',
              width: parseInt(currentPercentCheckpoint, 10) < 10 ? '0' : 'auto',
            }"
            :class="{
              faster: getPlaceValue(currentPercentCheckpoint, 2) == 1,
            }"
          >
            {{ getPlaceValue(currentPercentCheckpoint, 2) }}
          </span>
          <span class="units">
            {{ getPlaceValue(currentPercentCheckpoint, 1) }}
          </span>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
import { getPlaceValue } from "../../utils/utils";
import { gsap } from "gsap";

import { useWindowSize, useElementBounding } from "@vueuse/core";

export default {
  props: {
    currentPercentCheckpoint: String,
    loadedCount: Number,
    assetsCount: Number,
  },
  emits: ["done-animating"],
  methods: {
    getPlaceValue,
    onEnter,
  },
  setup(props) {
    // State
    const { width: windowWidth, height: windowHeight } = useWindowSize();
    const counterEl = ref(null);
    const { height } = useElementBounding(counterEl);

    // Methods
    function mediaQueryCallback(mobile) {
      if (!mobile) {
        gsap.set(counterEl, {
          y: -(
            (windowHeight - 64 - height) *
            (props.loadedCount / props.assetsCount)
          ),
        });
      }
    }

    // .exe
    const mobile = useMediaQuery(undefined, mediaQueryCallback);

    return {
      windowHeight,
      windowWidth,
      mobile,
      counterEl,
      counterElHeight: height,
    };
  },
};

function onEnter(el, done) {
  if (this.mobile) {
    // allow css based transitions to finish (for 700ms);
    return setTimeout(() => {
      this.$emit("done-animating", true);
      done();
    }, 1500);
  }

  gsap.to(".site-preloader__counter", {
    y: -(
      (this.windowHeight - 64 - this.counterElHeight) *
      (this.currentPercentCheckpoint / 100)
    ),
    duration: 1.5,
    ease: "circ.inOut",
    onComplete: () => {
      this.$emit("done-animating", true);
      done();
    },
  });
}
</script>

<style scoped>
@import url("~/styles/components/preloader/SitePreloaderCounter.pcss");
</style>