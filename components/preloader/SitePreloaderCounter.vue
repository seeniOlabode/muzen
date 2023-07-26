<template>
  <div
    class="site-preloader__counter"
    :class="{ mobile: !desktop }"
    ref="counterEl"
  >
    <div class="counter__wrapper">
      <span class="wrapper__false-text">000</span>
      <Transition name="loader-counter" @enter="onEnter">
        <div
          class="percent-check-point"
          :key="currentPercentCheckpoint + loadedCount"
        >
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

  <svg id="preloader-filters">
    <filter
      id="zap-out"
      x="-20%"
      y="-20%"
      width="140%"
      height="140%"
      ref="zapOutEl"
    >
      <feTurbulence
        type="turbulence"
        :baseFrequency="`${baseFrequency.x} ${baseFrequency.y}`"
        numOctaves="2"
        seed="2"
        result="NOISE"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="NOISE"
        xChannelSelector="R"
        yChannelSelector="G"
        scale="10"
      />
    </filter>
  </svg>
</template>

<script>
import { getPlaceValue } from "../../utils/utils";
import { gsap } from "gsap";

import { useWindowSize, useElementBounding } from "@vueuse/core";

export default {
  props: {
    currentPercentCheckpoint: String,
    loadedCount: Number,
    desktop: Boolean,
    assetsToLoad: Array,
  },
  data() {
    return {
      baseFrequency: {
        x: 0,
        y: 0,
      },
    };
  },
  methods: {
    getPlaceValue,
    onEnter,
  },
  setup() {
    const { width: windowWidth, height: windowHeight } = useWindowSize();
    let desktop = computed(() => windowWidth.value >= 724);

    const counterEl = ref(null);
    const { height } = useElementBounding(counterEl);

    const lock = ref(true);
    if (process.client) {
      lockScroll(lock);
    }

    return {
      windowHeight,
      windowWidth,
      desktop,
      counterEl,
      counterElHeight: height,
    };
  },

  watch: {
    windowHeight(value) {
      if (this.loadedCount == this.assetsToLoad.length && this.desktop) {
        gsap.set(".site-preloader__counter", {
          y: -(
            (this.windowHeight - 64 - this.counterElHeight) *
            (this.loadedCount / this.assetsToLoad.length)
          ),
        });
      }
    },
  },
};

function onEnter(el, done) {
  if (!this.desktop) {
    // allow css based transitions to finish (for 700ms);
    return setTimeout(done, 700);
  }
  const tl = gsap.timeline({
    paused: true,
    onComplete: done,
    duration: 0.7,
  });

  tl.addLabel("start", 0);
  tl.addLabel("up-move", "+=0.3");

  // const filterTl = gsap.timeline({
  //   paused: true,
  // });

  // filterTl
  //   .to(this.baseFrequency, {
  //     x: 0.2,
  //     duration: 0.25,
  //   })
  //   .to(this.baseFrequency, {
  //     x: 0,
  //     duration: 0.2,
  //   });

  // tl.add(filterTl.play(), "start");

  const transYTl = gsap.timeline({
    paused: true,
  });

  transYTl.to(".site-preloader__counter", {
    y: -(
      (this.windowHeight - 64 - this.counterElHeight) *
      (this.loadedCount / this.assetsToLoad.length)
    ),
  });

  tl.add(transYTl.play(), "start");
  tl.play();
}
</script>

<style scoped>
@import url("~/styles/components/preloader/SitePreloaderCounter.pcss");
</style>