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
    const assetsToLoad = [
      // Home Images
      "/images/Home/bd61410803fcb567cbae8ae3404ff547.jpg",
      "/images/Home/9c4185c457cfc98a6b1c74c7107e8394.jpg",
      "/images/Home/17537fd3f45377fd12276f9653e95dd3.jpg",
      "/images/Home/6b51bd3356a853ae5be74b3742214f83.jpg",
      "/images/Home/6d1aee11ee587f8da862c34fd3b582a7.jpg",
      "/images/Home/3a6643cb8f839f7835c98c13a4e24f70.jpg",
      "/images/Home/4cb3dbe4029b1f82262036eaa727c27f.jpg",
      "/images/Home/7ae766844aea609f111dba45eed73905.jpg",
      "/images/Home/43df5d316e46360d6fb01f4bb8624e3f.jpg",
      "/images/Home/846c726339639779cbf4e3a9cf3ca3ed.jpg",
      "/images/Home/2319c541d59e20ec4d3458ea26c88ad9.jpg",
      "/images/Home/c33c22f04c0db03d12ece71c9500f8b1.jpg",
      "/images/Home/f925b54c66129218d392aad65af94b92.jpg",
      // "/images/Home/home-hero-video.mp4",

      // // Studio Images
      // "/images/Studio/studio-video-trimmed.mp4",
      // "/images/Studio/1db92f315ae2c2d267ca44c083cb14c2.jpg",
      // "/images/Studio/5636d885fe1161dcd97994c12abd538b.jpg",
      // "/images/Studio/9192fda08a9092ebd418fdf0f6317ed0.jpg",
      // "/images/Studio/555216c6494565a1345316404f43f0b0.jpg",
      // "/images/Studio/b6f53ebe9da00b27334ecd7e7e9b3d89.jpg",
      // "/images/Studio/d712f8231b6a0f0cdcb549923cfc437b.jpg",
      // "/images/Studio/dbff007d3ed23e1870170e92ea820f47.jpg",
      // "/images/Studio/e0ee7218742c25fa5da77b4ce888891c.jpg",

      // // Lookbook Images
      // "/images/Lookbook/3a50c5c1a56ed6cce63f44a94e15d619.jpg",
      // "/images/Lookbook/6cdfc36505430dbebe65e065645ee42f.jpg",
      // "/images/Lookbook/7ee76d1e1815bfd2091ca9772b8094e0.jpg",
      // "/images/Lookbook/8ef59b0c1a22f7f8695b7ec887b84f23.jpg",
      // "/images/Lookbook/80f60a3b0f35d43ffa1501ad57716513.jpg",
      // "/images/Lookbook/86edab85d82bd80a81045d1c15e17d0f.jpg",
      // "/images/Lookbook/2879c57f0fd2a4913a7f62dbe1973396.jpg",
      // "/images/Lookbook/9192fda08a9092ebd418fdf0f6317ed0.jpg",
      // "/images/Lookbook/608211fde9d4cd23630731385fce5e46.jpg",
      // "/images/Lookbook/919256a084243a038a4cd79e8558311b.jpg",
      // "/images/Lookbook/a80ca52bb7eda09fef31d78458224070.jpg",
      // "/images/Lookbook/b111a4b60c2f93679af24e648479af07.jpg",
      // "/images/Lookbook/d8066a7aa3e02a19590370f71271a2cb.jpg",
      // "/images/Lookbook/d80979946fdded3c4ffc1099be314b62.jpg",
      // "/images/Lookbook/dbff007d3ed23e1870170e92ea820f47.jpg",
      // "/images/Lookbook/f925b54c66129218d392aad65af94b92.jpg",

      // // Contact Images
      // "/images/Contact/2218e288ff48b77ca0df131b7290e4c6.jpg",
    ];

    const lock = ref(true);
    if (process.client) {
      lockScroll(lock, "site-preloader");
    }
    return {
      windowWidth,
      desktop,
      assetsToLoad,
    };
  },
  data() {
    return {
      displayedImageIndex: 0,
      percentages: [],
      loadedCount: 0,
      changeImage: false,
      interval: Math.ceil(this.assetsToLoad.length / 5),
    };
  },
  watch: {
    loadedCount(value) {
      let changeInterval = Math.ceil(this.assetsToLoad.length / 3);
      if (value % changeInterval === 0 && this.displayedImageIndex != 2) {
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
      if (this.loadedCount === this.assetsToLoad.length) {
        return this.percentages[5];
      }
      return this.loadedCount > 0
        ? this.percentages[Math.floor(this.loadedCount / this.interval)]
        : "000";
    },
  },
  methods: {
    async load() {
      // Prepare for loading
      const percentPerAsset = (1 / this.assetsToLoad.length) * 100;
      const toThreeDigits = (num) => {
        if (num < 10) return "00" + num;
        if (num < 99) return "0" + num;
        return "" + num;
      };
      this.assetsToLoad.forEach((image, i) => {
        if (i === this.assetsToLoad.length - 1) {
          return this.percentages.push(toThreeDigits(100));
        } else if (i % this.interval === 0) {
          this.percentages.push(
            toThreeDigits(Math.floor(percentPerAsset * (i + 1)))
          );
        }
      });

      this.loadAssets();
    },
    async loadAssets() {
      const assets = this.assetsToLoad;
      const interval = this.interval;

      let i = 0;

      const loadAssetsLoop = async () => {
        if (this.loadedCount === this.assetsToLoad.length) {
          this.finishLoading();
          return null;
        }
        await this.preloadContent(assets[i]);

        this.loadedCount++;
        if (this.changeImage) {
          this.displayedImageIndex++;
          this.changeImage = false;
        }

        if (i % interval === 0 || i === assets.length - 1) {
          await new Promise((resolve) => {
            setTimeout(() => {
              i++;
              loadAssetsLoop();
            }, 1500);
          });
        } else {
          i++;
          loadAssetsLoop();
        }
      };

      await loadAssetsLoop();
    },
    async preloadContent(content) {
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
          video.addEventListener("loadeddata", r);
          video.addEventListener("error", r);
        };

        if (content.endsWith(".mp4")) {
          preloadVideo();
        } else {
          preloadImage();
        }
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