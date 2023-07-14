<template>
  <div class="site-preloader">
    <preloader-images :displayed-image-index="displayedImageIndex" />
    <site-preloader-counter
      :currentPercentCheckpoint="currentPercentCheckpoint"
      :loaded-count="loadedCount"
      :desktop="desktop"
      :assets-to-load="assetsToLoad"
    />
  </div>
</template>

<script>
import { gsap } from "gsap";
import { useWindowSize, useElementBounding } from "@vueuse/core";

export default {
  emits: ["assets-loaded"],
  setup() {
    const { width: windowWidth } = useWindowSize();
    let desktop = computed(() => windowWidth.value >= 724);
    return {
      windowWidth,
      desktop,
    };
  },
  data() {
    return {
      displayedImageIndex: 0,
      assetsToLoad: [1, 2, 3, 4, 5, 6],
      percentages: [],
      loadedCount: 0,
      changeImage: false,
      actualAssetsToLoad: [
        "/images/Home/bd61410803fcb567cbae8ae3404ff547.jpg",
        "/images/Home/9c4185c457cfc98a6b1c74c7107e8394.jpg",
        "/images/Home/17537fd3f45377fd12276f9653e95dd3.jpg",
        "/images/Home/6b51bd3356a853ae5be74b3742214f83.jpg",
        "/images/Home/6d1aee11ee587f8da862c34fd3b582a7.jpg",
        "/images/Home/3a6643cb8f839f7835c98c13a4e24f70.jpg",
      ],
    };
  },
  watch: {
    loadedCount(value) {
      let interval = this.assetsToLoad.length / 3;
      if (value % interval === 0 && this.displayedImageIndex != 2) {
        this.changeImage = true;
      }
    },

    desktop(value, formerValue) {
      if (value && !formerValue) {
        gsap.set(".site-preloader__counter", {
          y: -(
            (this.windowHeight - 64 - this.counterElHeight) *
            (this.loadedCount / this.assetsToLoad.length)
          ),
        });
      }
    },
  },
  computed: {
    currentPercentCheckpoint() {
      return this.loadedCount > 0
        ? this.percentages[this.loadedCount - 1]
        : "000";
    },
  },
  methods: {
    async load() {
      const percentPerAsset = (1 / this.assetsToLoad.length) * 100;
      const toThreeDigits = (num) => {
        if (num < 10) return "00" + num;
        if (num < 99) return "0" + num;
        return "" + num;
      };
      this.assetsToLoad.forEach((image, i) => {
        this.percentages.push(
          toThreeDigits(Math.ceil(percentPerAsset * (i + 1)))
        );
      });
      this.loadAssets();
    },
    async loadAssets() {
      const assets = this.assetsToLoad;

      for (let i = 0; i < assets.length; i++) {
        await this.preloadImage(assets[i]);
        await new Promise((r) => {
          if (this.changeImage) {
            this.displayedImageIndex++;
            this.changeImage = false;
          }
          this.loadedCount++;
          r();
        });
      }
      this.finishLoading();
    },
    async preloadImage(img) {
      return new Promise((r) => {
        setTimeout(r, 2000);
      });
    },
    finishLoading() {
      setTimeout(() => {
        this.$emit("assets-loaded", true);
      }, 2000);
    },
  },
  mounted() {
    this.load();
  },
};
</script>

<style scoped>
@import url("../../styles/components/preloader/SitePreloader.pcss");
</style>