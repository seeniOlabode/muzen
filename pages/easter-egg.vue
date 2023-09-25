<template>
  <main class="easter-egg-page" ref="easterPage">
    <div class="easter-egg-page__wrapper" v-if="desktop">
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
        <div class="preview-container__backdrop" @click="closePreview"></div>
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
import { useWindowSize } from "@vueuse/core";
import lockScroll from "~/composables/lockScroll";
import useParentOverflow from "~/composables/useParentOverflow";

import { getBounding, getCssVariable } from "~/utils/utils";

import { gsap } from "gsap";
import { Observer, CustomEase } from "gsap/all";
gsap.registerPlugin(Observer, CustomEase);

import { easterEggAnimations } from "~/animations/easter-egg/easter-egg";

export default {
  setup() {
    const { width: windowWidth } = useWindowSize();
    const scrollLocked = ref(false);
    if (process.client) {
      lockScroll(scrollLocked, "easter", true);
      useParentOverflow("body");
      useParentOverflow("html");
    }
    return {
      windowWidth,
      scrollLocked,
    };
  },
  data() {
    return {
      selectedImg: null,
      showPreview: false,
      images: [
        "/images/Easter/27d5f262825506cd4723c3d1f67d59af.jpg",
        "/images/Easter/ahmed-carter-XzGIUm4GJGc-unsplash.jpg",
        "/images/Easter/ali-pazani-DyIqeZLhIz8-unsplash.jpg",
        "/images/Easter/dex-ezekiel-M6KkYlhCwuA-unsplash.jpg",
        "/images/Easter/dom-hill-nimElTcTNyY-unsplash.jpg",
        "/images/Easter/drew-tilk-EhmLEzVSx1Q-unsplash.jpg",
        "/images/Easter/huseyin-kilic-2U2wPj0lsbY-unsplash.jpg",
        "/images/Easter/jasmin-chew-nlRIdHSvgro-unsplash.jpg",
        "/images/Easter/jasmin-chew-txy8AZU04iw-unsplash.jpg",
        "/images/Easter/joshua-rondeau-JzSq9sOgq6g-unsplash.jpg",
        "/images/Easter/joshua-rondeau-kaQfPZKYHYs-unsplash.jpg",
        "/images/Easter/khaled-ghareeb-qL_EfyvR07s-unsplash.jpg",
        "/images/Easter/lance-reis-FPYq6DDI1gA-unsplash.jpg",
        "/images/Easter/lance-reis-OzEiSTZlyHw-unsplash.jpg",
        "/images/Easter/lance-reis-RQO2DmrRJFg-unsplash.jpg",
        "/images/Easter/lance-reis-SsrVdOK-SDk-unsplash.jpg",
        "/images/Easter/mery-khachatryan-jKj8q0gXvkk-unsplash.jpg",
        "/images/Easter/mojtaba-mosayebzadeh-tQ8lCKcncx4-unsplash.jpg",
        "/images/Easter/naeim-jafari-s3VxCT4p8FM-unsplash.jpg",
        "/images/Easter/rghiejwee.jpg",
        "/images/Easter/sergi-dolcet-escrig-VtcSGIvYJRY-unsplash.jpg",
        "/images/Easter/simeon-asenov-Wtj5aRVMDZM-unsplash.jpg",
        "/images/Easter/tamara-bellis-CnpWWzoSke4-unsplash.jpg",
        "/images/Easter/thevaler_s-QsrZaSJqG4k-unsplash.jpg",
      ],
    };
  },
  mounted() {
    this.scrollLocked = false;
    easterEggAnimations.init(this.$refs.easterPage);
    // easterEggAnimations.stop();
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
    previewEnter(el, done) {
      const scopeSelect = gsap.utils.selector(el);
      const photo = this.$refs.photosList[this.selectedImg];
      const photoBounds = getBounding(photo);
      const photoHalfX = photoBounds.width / 2;
      const photoHalfY = photoBounds.height / 2;
      const photoCenteredX = photoBounds.x + photoHalfX;
      const photoCenteredY = photoBounds.y + photoHalfY;

      const previewImageBounds = getBounding(this.$refs.previewContainerImage);
      const previewImageHalfX = previewImageBounds.width / 2;
      const previewImageHalfY = previewImageBounds.height / 2;
      const previewImageCenteredX = previewImageBounds.x + previewImageHalfX;
      const previewImageCenteredY = previewImageBounds.y + previewImageHalfY;

      const photoTransX = parseFloat(getCssVariable(photo, "x"));
      const photoTransY = parseFloat(getCssVariable(photo, "y"));

      const scaleTo = previewImageBounds.width / photoBounds.width;

      const xTo = previewImageCenteredX - photoCenteredX + photoTransX;
      const yTo = previewImageCenteredY - photoCenteredY + photoTransY;

      gsap.set(photo, { "--preview-x": xTo, "--preview-y": yTo });

      const tl = gsap
        .timeline({ paused: true })
        .set(photo, { zIndex: 10000 })
        .to(photo, { x: xTo, y: yTo, duration: 0.8, ease: "circ.out" })
        .to(
          photo,
          { scaleX: scaleTo, ease: "power1.inOut", duration: 0.8 },
          "<"
        )
        .to(
          photo,
          {
            scaleY: scaleTo,
            duration: 0.8,
            ease: "power3.inOut",
          },
          "<"
        )
        .to(
          scopeSelect(".preview-container__backdrop"),
          {
            autoAlpha: 1,
          },
          "<+=0.25"
        )
        .set(scopeSelect(".preview-container__image"), {
          visibility: "visible",
        })
        .set(photo, { visibility: "hidden" })
        .call(done)
        .play();
    },
    previewLeave(el, done) {
      const scopeSelect = gsap.utils.selector(el);
      const photo = this.$refs.photosList[this.selectedImg];

      const photoX = parseFloat(getCssVariable(photo, "x"));
      const photoY = parseFloat(getCssVariable(photo, "y"));

      const previewBackdrop = scopeSelect(".preview-container__backdrop");

      const tl = gsap
        .timeline({ paused: true })
        .set(photo, { visibility: "visible" })
        .set(scopeSelect(".preview-container__image"), { visibility: "hidden" })
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
  computed: {
    desktop() {
      return this.windowWidth >= 724;
    },
  },
  watch: {
    desktop(value) {
      if (!value) {
        easterEggAnimations.stop();
      } else {
        easterEggAnimations.start();
      }
    },
  },
};
</script>

<style scoped>
.easter-egg-page {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.easter-egg-page__wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.photo-list__photo {
  list-style: none;
  overflow: hidden;
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
  position: absolute;
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
}
</style>