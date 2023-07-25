<template>
  <main class="easter-egg-page" ref="easterPage">
    <div class="easter-egg-page__wrapper">
      <ul class="easter-egg-page__photo-list">
        <li
          class="photo-list__photo"
          v-for="(image, i) in images"
          :key="image + i"
        >
          <img :src="image" alt="" />
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import { useWindowSize } from "@vueuse/core";
import lockScroll from "~/composables/lockScroll";

import { gsap } from "gsap";
import { Observer } from "gsap/all";
gsap.registerPlugin(Observer);

import { easterEggAnimations } from "~/animations/easter-egg/easter-egg";

export default {
  setup() {
    const { width: windowWidth } = useWindowSize();
    const scrollLocked = ref(false);
    if (process.client) {
      lockScroll(scrollLocked);
    }
    return {
      windowWidth,
      scrollLocked,
    };
  },
  data() {
    return {
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
      easterEggAnimations,
    };
  },
  mounted() {
    this.scrollLocked = true;

    easterEggAnimations.init(this.$refs.easterPage);
  },
};
</script>

<style scoped>
.easter-egg-page {
  height: 100vh;
  width: 100vw;
}

.easter-egg-page__wrapper {
  width: 100%;
  height: 100%;
}

.easter-egg-page__photo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;

  .photo-list__photo {
    position: absolute;
    left: 0;
    top: 0;
    display: none;

    &:hover {
      cursor: pointer;
      z-index: 1000;
    }
  }

  .photo-list__photo {
    &:nth-of-type(1) {
      display: unset;
      width: 187px;
      top: 886px;
      left: 40px;
    }

    &:nth-of-type(2) {
      display: unset;
      width: 289px;
      top: 550px;
      left: 500px;
    }
    &:nth-of-type(3) {
      display: unset;
      width: 213px;
      top: 30px;
      left: 20px;
    }

    &:nth-of-type(4) {
      display: unset;
      width: 197px;
      top: 1000px;
      left: 450px;
    }

    &:nth-of-type(5) {
      display: unset;
      width: 208px;
      left: 800px;
      top: 1200px;
    }

    &:nth-of-type(6) {
      display: unset;
      width: 164px;
      left: -200px;
      top: 1100px;
    }
    &:nth-of-type(7) {
      display: unset;
      width: 164px;
      top: 400px;
      left: 300px;
    }

    &:nth-of-type(8) {
      display: unset;
      width: 224px;
      top: 750px;
      right: -400px;
      left: unset;
    }

    &:nth-of-type(9) {
      display: unset;
      width: 176px;
      top: 330px;
      left: 100px;
    }

    &:nth-of-type(10) {
      display: unset;
      width: 184px;
      top: 200px;
      left: 500px;
    }

    &:nth-of-type(11) {
      display: unset;
      width: 229px;
      top: 400px;
      left: 1100px;
    }

    &:nth-of-type(12) {
      display: unset;
      width: 229px;
      left: 1900px;
    }

    &:nth-of-type(13) {
      display: unset;
      width: 266px;
      left: -230px;
      top: 400px;
    }

    &:nth-of-type(14) {
      display: unset;
      width: 254px;
      left: 1300px;
      top: 800px;
    }

    &:nth-of-type(15) {
      display: unset;
      width: 224px;
      left: 1400px;
      top: 500px;
    }

    &:nth-of-type(16) {
      display: unset;
      width: 140px;
      left: 1800px;
      top: 600px;
    }

    &:nth-of-type(17) {
      display: unset;
      width: 229px;
      top: 500px;
      left: 800px;
    }

    &:nth-of-type(18) {
      display: unset;
      width: 233px;
      left: 1150px;
      top: 200px;
    }

    &:nth-of-type(19) {
      display: unset;
      width: 200px;
      left: 1400px;
      top: 50px;
    }

    &:nth-of-type(20) {
      display: unset;
      width: 194px;
      left: 800px;
      top: 50px;
    }

    &:nth-of-type(21) {
      display: unset;
      width: 233px;
      top: 650px;
      left: 200px;
    }

    &:nth-of-type(22) {
      display: unset;
      width: 174px;
      left: -350px;
      top: 485px;
    }

    &:nth-of-type(23) {
      display: unset;
      width: 253px;
      top: 800px;
      left: 650px;
    }

    &:nth-of-type(24) {
      display: unset;
      width: 233px;
      top: 300px;
      left: 650px;
    }
  }
}
</style>