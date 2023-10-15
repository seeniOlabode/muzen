<template>
  <div class="site-preloader">
    <preloader-images :displayed-image-index="displayedImageIndex" />
    <site-preloader-counter
      :currentPercentCheckpoint="counterPercentCheckpoint"
      :loaded-count="loadedCount"
      :desktop="desktop"
      :assets-to-load="assetsToLoad"
      @done-animating="updateCounterPercent"
    />
  </div>
</template>

<script>
import { gsap } from "gsap";
import { useWindowSize, useElementBounding } from "@vueuse/core";

import { assetsToLoad } from "../../assets/data";

export default {
  setup(_, context) {
    const { width: windowWidth } = useWindowSize();
    let desktop = computed(() => windowWidth.value >= 724);

    const percentages = ref([]);
    const loadedCount = ref(0);
    const interval = ref(Math.ceil(assetsToLoad.length / 5));
    const counterPercentCheckpoint = ref("000");
    const displayedImageIndex = ref(0);
    const changeImage = ref(false);
    const loadingStarted = ref(false);
    const animating = ref(false);

    const unwatchCurrentPercentCheckpoint = ref(null);

    const currentPercentCheckpoint = computed(() => {
      if (loadedCount.value === assetsToLoad.length) {
        return percentages.value[percentages.value.length - 1];
      }
      return loadedCount.value > 0
        ? percentages.value[Math.floor(loadedCount.value / interval.value)]
        : "000";
    });

    const unwatchLoadedCount = watch(loadedCount, (value) => {
      let changeInterval = Math.ceil(assetsToLoad.length / 3);
      if (value % changeInterval === 0 && displayedImageIndex.value != 2) {
        changeImage.value = true;
      }
    });

    function updateCounterPercent() {
      animating.value = false;

      const current = currentPercentCheckpoint.value;
      const counter = counterPercentCheckpoint.value;

      console.log(current, counter);

      if (Number(current) > Number(counter)) {
        unwatchCurrentPercentCheckpoint.value &&
          unwatchCurrentPercentCheckpoint.value();
        const percentagesArray = percentages.value;

        counterPercentCheckpoint.value = current;
        const setDisplayedImg =
          changeImage.value ||
          current === percentagesArray[percentagesArray.length - 1];
        if (setDisplayedImg) {
          animating.value = true;
          displayedImageIndex.value++;
          changeImage.value = false;
        }
      } else {
        unwatchCurrentPercentCheckpoint.value = watch(
          currentPercentCheckpoint,
          updateCounterPercent
        );
      }
    }

    const lock = ref(true);
    if (process.client) {
      lockScroll(lock, "site-preloader");
    }

    async function preloadContent(content, i) {
      return new Promise((r) => {
        const preloadImage = () => {
          const image = new Image();
          image.onload = r;
          image.onerror = r;
          image.src = content;
        };
        const preloadVideo = () => {
          const video = document.createElement("video");
          video.src = content;
          video.preload = "auto";
          video.addEventListener("loadeddata", r);
          video.addEventListener("error", r);
        };

        try {
          if (content.endsWith(".mp4")) {
            preloadVideo();
          } else {
            preloadImage();
          }
        } catch (err) {
          console.log(err, content, i);
        }
      });
    }

    async function finishLoading() {
      watch(
        animating,
        (value) => {
          value &&
            setTimeout(() => {
              console.log(value);
              context.emit("assets-loaded", true);
              console.log("finish set");
            }, 2000);
        },
        { immediate: true }
      );
    }

    async function loadAssets() {
      let i = 0;

      const loadAssetsLoop = async () => {
        if (i >= assetsToLoad.length) {
          return finishLoading();
        }
        await preloadContent(assetsToLoad[i], i);

        loadedCount.value++;

        if (i % interval.value && counterPercentCheckpoint.value === "000") {
          counterPercentCheckpoint.value = percentages.value[0];
        }

        i++;
        loadAssetsLoop();
      };

      await loadAssetsLoop();
    }

    async function load() {
      // Prepare for loading
      const percentPerAsset = (1 / assetsToLoad.length) * 100;
      const toThreeDigits = (num) => {
        if (num < 10) return "00" + num;
        if (num < 99) return "0" + num;
        return "" + num;
      };
      assetsToLoad.forEach((image, i) => {
        if (i === assetsToLoad.length - 1) {
          return percentages.value.push(toThreeDigits(100));
        } else if (i % interval.value === 0) {
          percentages.value.push(
            toThreeDigits(Math.floor(percentPerAsset * (i + 1)))
          );
        }
      });

      loadAssets();
    }

    onMounted(() => {
      load();
    });
    return {
      assetsToLoad,
      windowWidth,
      desktop,
      percentages,
      currentPercentCheckpoint,
      counterPercentCheckpoint,
      loadedCount,
      interval,
      displayedImageIndex,
      changeImage,
      updateCounterPercent,
      loadingStarted,
    };
  },
  data() {
    return {
      animating: false,
    };
  },
  watch: {
    desktop(value, formerValue) {
      if (value && !formerValue) {
        gsap.set(".site-preloader__counter", {
          y: -(
            (this.windowHeight - 64 - this.counterElHeight) *
            (this.loadedCount / assetsToLoad.length)
          ),
        });
      }
    },
  },
};
</script>

<style scoped>
@import url("../../styles/components/preloader/SitePreloader.pcss");
</style>