<template>
  <section class="home-hero" ref="homeHero">
    <div class="home-hero__video-wrapper">
      <video
        class="video-wrapper__video"
        src="/images/Home/home-hero-video.mp4"
        autoplay
        loop
      ></video>
    </div>
    <div class="home-hero__copy container">
      <p class="copy__body body">
        Muzen is a fashion photography studio based in Asgard, Nethers.
      </p>
      <p class="copy__body body">
        We are dedicated to capturing the essence of style and beauty through
        our lens.
      </p>
      <p class="copy__body body">
        Our passion lies in creating captivating visual stories that elevate
        fashion to an art form.
      </p>
    </div>
    <div class="home-hero__logo">
      <h2 class="logo__word">
        <span
          class="logo__char"
          v-for="(char, i) in logoSplitText"
          :key="char + i + 'home-hero'"
          >{{ char }}</span
        >
      </h2>
      <div class="honor__tag" id="photo">BEST IN PHOTOGRAPHY</div>
      <div class="honor__tag">EDITOR'S CHOICE</div>
    </div>
  </section>
</template>

<script>
import { HomeHeroAnimations } from "~/animations/Home/HomeHero";
import { gsap } from "gsap";
import { Draggable } from "gsap/all";

gsap.registerPlugin(Draggable);

export default {
  inject: ["getTransitioned"],
  computed: {
    logoSplitText() {
      return "Muzen".split("");
    },
    transitioned() {
      return this.getTransitioned();
    },
  },
  mounted() {
    if (this.transitioned) {
      this.$eventBus.on("home-enter-animation", () => {
        HomeHeroAnimations.init(this.$refs.homeHero);
        this.$eventBus.off("home-enter-animation");
      });
    } else {
      HomeHeroAnimations.init(this.$refs.homeHero);
    }
  },
};
</script>

<style scoped>
@import url("~/styles/components/Home/HomeHero.pcss");
</style>