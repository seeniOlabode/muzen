<template>
  <div class="site-preloader">
    <preloader-images :displayed-image-index="displayedImageIndex" />
    <site-preloader-counter
      :currentPercentCheckpoint="counterPercentCheckpoint"
      :loaded-count="loadedCount"
      :assets-count="assetsToLoad.length"
      @done-animating="updateCounterPercent"
    />
  </div>
</template>

<script>
import { assetsToLoad as allAssets } from "../../assets/data";
import { preloadContent } from "~/utils/utils";

let assetsToLoad = [];

export default {
  setup(_, context) {
    const route = useRoute(); // .exe
    let mobile;
    if (process.client) {
      mobile = window.innerWidth < 724;
      assetsToLoad = [
        ...allAssets[route.fullPath]["all"],
        ...allAssets[route.fullPath][mobile ? "mobile" : "desktop"],
      ];
    }

    // State
    const lock = ref(true);
    const percentages = ref([]);
    const loadedCount = ref(0);
    const interval = ref(Math.ceil(assetsToLoad.length / 5));
    const counterPercentCheckpoint = ref("000");
    const displayedImageIndex = ref(0);
    const changeImage = ref(false);
    const loadingStarted = ref(false);
    const animating = ref(false);
    const unwatchCurrentPercentCheckpoint = ref(null);

    // Computed
    const currentPercentCheckpoint = computed(() => {
      if (loadedCount.value === assetsToLoad.length) {
        return percentages.value[percentages.value.length - 1];
      }
      return loadedCount.value > 0
        ? percentages.value[Math.floor(loadedCount.value / interval.value)]
        : "000";
    });

    // Methods
    function updateCounterPercent() {
      animating.value = false;

      const current = currentPercentCheckpoint.value;
      const counter = counterPercentCheckpoint.value;

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
          displayedImageIndex.value =
            displayedImageIndex.value + 1 < 3
              ? displayedImageIndex.value + 1
              : displayedImageIndex.value;
          changeImage.value = false;
        }
      } else {
        unwatchCurrentPercentCheckpoint.value = watch(
          currentPercentCheckpoint,
          updateCounterPercent
        );
      }

      if (Number(counterPercentCheckpoint.value) == 100) {
        finishLoading();
      }
    }

    async function finishLoading() {
      watch(
        animating,
        (value) => {
          !value &&
            setTimeout(() => {
              context.emit("assets-loaded", true);
            }, 1500);
        },
        { immediate: true }
      );
    }

    async function loadAssets() {
      let i = 0;

      const loadAssetsLoop = async () => {
        if (i >= assetsToLoad.length) {
          return null;
        }
        await preloadContent(assetsToLoad[i], i);

        loadedCount.value++;

        if (!(i % interval.value) && counterPercentCheckpoint.value === "000") {
          counterPercentCheckpoint.value = percentages.value[0];
        }

        i++;
        loadAssetsLoop();
      };

      await loadAssetsLoop();
    }

    async function load() {
      if (loadingStarted.value) {
        return;
      }

      loadingStarted.value = true;
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

    function loadOthers() {
      const othersToLoad = [];
      for (const path in allAssets) {
        if (path !== route.fullPath) {
          othersToLoad.push(...allAssets[path]["all"]);
          othersToLoad.push(...allAssets[path][mobile ? "mobile" : "desktop"]);
        }
      }
      othersToLoad.forEach((c) => {
        preloadContent(c);
      });
    }

    // Watchers
    const unwatchLoadedCount = watch(loadedCount, (value) => {
      let changeInterval = Math.ceil(assetsToLoad.length / 3);
      if (value % changeInterval === 0 && displayedImageIndex.value != 2) {
        changeImage.value = true;
      }
    });

    // .exe
    if (process.client) {
      lockScroll(lock, "site-preloader");
    }

    onBeforeMount(() => {
      if (process.client) {
        window.addEventListener("load", load);
      }
    });

    onMounted(() => {
      load();
    });

    onBeforeUnmount(() => {
      window.removeEventListener("load", load);
    });

    onUnmounted(() => {
      loadOthers();
    });
    return {
      assetsToLoad,
      currentPercentCheckpoint,
      counterPercentCheckpoint,
      loadedCount,
      displayedImageIndex,
      updateCounterPercent,
    };
  },
};
</script>

<style scoped>
@import url("../../styles/components/preloader/SitePreloader.pcss");
</style>