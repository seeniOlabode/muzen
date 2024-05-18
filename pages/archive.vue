<template>
  <main class="easter-egg-page" ref="easterPage">
    <div class="easter-egg-page__wrapper" v-if="!mobile">
      <ul class="easter-egg-page__photo-list" ref="photoList">
        <li
          class="photo-list__photo"
          :class="['photo-' + i]"
          v-for="(image, i) in images"
          :key="image + i"
          ref="photosList"
          @click="previewImage(i)"
        >
          <img class="photo__img" :src="image" alt="" />
        </li>
      </ul>
    </div>

    <Transition @enter="previewEnter" @leave="previewLeave">
      <div v-show="showPreview" class="easter-egg-page__preview-container">
        <div
          class="preview-container__backdrop"
          @click="closePreview"
          ref="previewBackdrop"
        ></div>
        <img
          class="preview-container__image"
          :src="images[selectedImg]"
          alt=""
          ref="previewContainerImage"
        />
      </div>
    </Transition>
  </main>
</template>

<script>
import lockScroll from "~/composables/lockScroll";

import { getBounding, getCssVariable } from "~/utils/utils";
import { gsap } from "gsap";
import { animations } from "~/animations/easter-egg/easter-egg";
import { assetsToLoad } from "assets/data";

const easterEggAnimations = new animations();

export default {
  setup() {
    // State
    const images = assetsToLoad["/archive"].desktop;
    const scrollLocked = ref(false);
    const easterPage = ref(null);

    // Methods
    function mediaQueryCallback(mobile) {
      if (mobile) {
        easterEggAnimations.stop();
      } else {
        easterEggAnimations.start();
      }
    }

    // .exe
    if (process.client) {
      lockScroll(scrollLocked, "easter", true);

      onMounted(() => {
        scrollLocked.value = false;
        easterEggAnimations.init(easterPage.value);
        gsap.set("body, html", {
          overflow: "hidden",
        });
      });

      onUnmounted(() => {
        gsap.set("body, html", {
          overflow: "unset",
        });
      });
    }
    const mobile = useMediaQuery(undefined, mediaQueryCallback);

    return {
      mobile,
      scrollLocked,
      images,
      easterPage,
    };
  },
  data() {
    return {
      selectedImg: null,
      showPreview: false,
      SCALE_WIDTH_TO: 500,
    };
  },
  methods: {
    previewImage(i) {
      easterEggAnimations.stop();
      this.selectedImg = i;
      this.showPreview = true;
    },
    closePreview() {
      this.showPreview = false;
    },
    getPhotoCurrentTranslateValues(photo) {
      return {
        x: parseFloat(getCssVariable(photo, "x")),
        y: parseFloat(getCssVariable(photo, "y")),
      };
    },
    getCurrentPhotoHeightAfterScale(scaleBy) {
      return scaleBy * this.currentPhotoBounding.height;
    },
    getScaleTarget() {
      let scaleBy = this.SCALE_WIDTH_TO / this.currentPhotoBounding.width;

      let seventyViewHeight = 0.7 * window.innerHeight;

      if (this.getCurrentPhotoHeightAfterScale(scaleBy) > seventyViewHeight) {
        // scale by height to 70vh instead
        return seventyViewHeight / this.currentPhotoBounding.height;
      } else {
        // scale by width to 500px;
        return scaleBy;
      }
    },
    getWindowCenterCoordinates() {
      return {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
    },
    getTargetCoordinates() {
      const windowCenterCoordinates = this.getWindowCenterCoordinates();

      return {
        x:
          windowCenterCoordinates.x -
          this.currentPhotoCoordinates.x +
          this.currentPhotoTranslateValues.x,
        y:
          windowCenterCoordinates.y -
          this.currentPhotoCoordinates.y +
          this.currentPhotoTranslateValues.y,
      };
    },
    getCurrentPhotoTargetValues() {
      const { x: targetX, y: targetY } = this.getTargetCoordinates();
      const targetScale = this.getScaleTarget(this.currentPhoto);

      return {
        scale: targetScale,
        x: targetX,
        y: targetY,
      };
    },
    previewEnter(el, done) {
      const previewBackdrop = this.$refs.previewBackdrop;
      const previewImage = this.$refs.previewContainerImage;

      const {
        x: targetX,
        y: targetY,
        scale: targetScale,
      } = this.getCurrentPhotoTargetValues();

      const photo = this.currentPhoto;

      const tl = gsap
        .timeline({ paused: true })
        .set(photo, { zIndex: 10000 })
        .addLabel("start")
        .to(photo, { x: targetX, y: targetY, duration: 0.8, ease: "circ.out" })
        .to(
          photo,
          { scaleX: targetScale, ease: "power1.inOut", duration: 0.8 },
          "<"
        )
        .to(
          photo,
          { scaleY: targetScale, duration: 0.8, ease: "power3.inOut" },
          "<"
        )
        .to(previewBackdrop, { autoAlpha: 1 }, "<+=0.25")
        .set(previewImage, { visibility: "visible" })
        .set(photo, { visibility: "hidden" })
        .call(done)
        .play();
    },
    previewLeave(el, done) {
      const scopeSelect = gsap.utils.selector(el);
      const previewImage = scopeSelect(".preview-container__image");
      const photo = this.$refs.photosList[this.selectedImg];

      const photoX = parseFloat(getCssVariable(photo, "x"));
      const photoY = parseFloat(getCssVariable(photo, "y"));

      const previewBackdrop = scopeSelect(".preview-container__backdrop");

      const tl = gsap
        .timeline({ paused: true })
        .set(photo, { visibility: "visible" })
        .set(previewImage, { visibility: "hidden" })
        .to(photo, { x: photoX, y: photoY })
        .to(photo, { scaleX: 1, duration: 0.8, ease: "power1.inOut" }, "<")
        .to(photo, { scaleY: 1, duration: 0.8, ease: "power3.inOut" }, "<")
        .to(previewBackdrop, { autoAlpha: 0 }, "<+=0.25")
        .call(done)
        .call(() => {
          photo.style.cssText = "";
          easterEggAnimations.start();
        })
        .play();
    },
  },
  beforeUnmount() {
    this.showPreview = false;
    this.selectedImg = null;
  },
  computed: {
    currentPhoto() {
      if (this.selectedImg) {
        return this.$refs.photosList[this.selectedImg];
      } else {
        return null;
      }
    },
    currentPhotoBounding() {
      if (this.currentPhoto) {
        return getBounding(this.currentPhoto);
      } else {
        return null;
      }
    },
    currentPhotoCoordinates() {
      const bounding = this.currentPhotoBounding;
      if (bounding) {
        return {
          x: bounding.x + bounding.width / 2,
          y: bounding.y + bounding.height / 2,
        };
      }
    },
    currentPhotoTranslateValues() {
      if (this.currentPhoto) {
        return {
          x: parseFloat(getCssVariable(this.currentPhoto, "x")),
          y: parseFloat(getCssVariable(this.currentPhoto, "y")),
        };
      }
    },
  },
};
</script>

<style scoped>
.easter-egg-page {
  height: calc((var(--vh, 1vh) * 100));
  width: 100vw;
  overflow: hidden;
}

.easter-egg-page__wrapper {
  width: 100vw;
  height: calc((var(--vh, 1vh) * 100));
  overflow: hidden;
}

.photo-list__photo {
  list-style: none;
  overflow: hidden;
  will-change: transform;
}

.easter-egg-page__photo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  grid-template-columns: 1fr 500px 1fr;
  grid-template-areas: "... ... ..." "... img ..." "... ... ..";

  .photo-list__photo {
    position: absolute;
    left: 0;
    top: 0;
    transform-origin: center;
    transform: translate(var(--x), var(--y));

    &:hover {
      cursor: pointer;
      z-index: 1000;
    }

    &.open {
      z-index: 2000;
    }
  }

  .photo-list__photo {
    &.photo-0 {
      display: unset;
      width: 187px;
      top: 886px;
      left: 40px;
    }

    &.photo-1 {
      display: unset;
      width: 289px;
      top: 550px;
      left: 500px;
    }
    &.photo-2 {
      display: unset;
      width: 213px;
      top: 30px;
      left: 20px;
    }

    &.photo-3 {
      display: unset;
      width: 197px;
      top: 1000px;
      left: 450px;
    }

    &.photo-4 {
      display: unset;
      width: 208px;
      left: 800px;
      top: 1200px;
    }

    &.photo-5 {
      display: unset;
      width: 164px;
      left: -200px;
      top: 1100px;
    }
    &.photo-6 {
      display: unset;
      width: 164px;
      top: 400px;
      left: 300px;
    }

    &.photo-7 {
      display: unset;
      width: 224px;
      top: 750px;
      left: 1900px;
    }

    &.photo-8 {
      display: unset;
      width: 176px;
      top: 330px;
      left: 100px;
    }

    &.photo-9 {
      display: unset;
      width: 184px;
      top: 200px;
      left: 500px;
    }

    &.photo-10 {
      display: unset;
      width: 229px;
      top: 400px;
      left: 1100px;
    }

    &.photo-11 {
      display: unset;
      width: 229px;
      left: 1900px;
    }

    &.photo-12 {
      display: unset;
      width: 266px;
      left: -230px;
      top: 400px;
    }

    &.photo-13 {
      display: unset;
      width: 254px;
      left: 1300px;
      top: 800px;
    }

    &.photo-14 {
      display: unset;
      width: 224px;
      left: 1400px;
      top: 500px;
    }

    &.photo-15 {
      display: unset;
      width: 140px;
      left: 1800px;
      top: 600px;
    }

    &.photo-16 {
      display: unset;
      width: 229px;
      top: 500px;
      left: 800px;
    }

    &.photo-17 {
      display: unset;
      width: 233px;
      left: 1150px;
      top: 200px;
    }

    &.photo-18 {
      display: unset;
      width: 200px;
      left: 1400px;
      top: 50px;
    }

    &.photo-19 {
      display: unset;
      width: 194px;
      left: 800px;
      top: 50px;
    }

    &.photo-20 {
      display: unset;
      width: 233px;
      top: 650px;
      left: 200px;
    }

    &.photo-21 {
      display: unset;
      width: 174px;
      left: -350px;
      top: 485px;
    }

    &.photo-22 {
      display: unset;
      width: 253px;
      top: 800px;
      left: 650px;
    }

    &.photo-23 {
      display: unset;
      width: 233px;
      top: 300px;
      left: 650px;
    }
  }
}

.photo__img {
  pointer-events: none;
}

.photo-list__backdrop {
  grid-area: backdrop;
  grid-row: 1/4;
  grid-column: 1/4;
  z-index: 10;
  background: var(--muzen-dark-brown);
  opacity: 0.95;
}

.easter-egg-page__preview-container {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  grid-template-columns: 1fr 500px 1fr;
  grid-template-areas: "... ... ..." "... img ..." "... ... ..";
}

.preview-container__backdrop {
  background: rgba(28, 24, 22, 0.95);
  opacity: 0;
  grid-column: 1/4;
  grid-row: 1/4;
  position: relative;
  z-index: 1;
  visibility: hidden;
}

.preview-container__image {
  grid-area: img;
  position: relative;
  z-index: 10;
  visibility: hidden;
  max-height: 70vh;
  margin-left: auto;
  margin-right: auto;
}
</style>