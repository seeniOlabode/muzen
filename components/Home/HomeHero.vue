<template>
  <section class="home-hero" ref="homeHero">
    <div class="home-hero__video-wrapper">
      <video
        class="video-wrapper__video"
        src="/images/Home/Home Video Trimmed.mp4"
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
    </div>
  </section>
</template>

<script>
// import { HomeHeroAnimations } from "~/animations/Home/HomeHero";

export default {
  data() {
    return {};
  },
  computed: {
    logoSplitText() {
      return "Muzen".split("");
    },
  },
  // setup() {
  //   const homeHero = ref(null);
  //   const animationSet = ref(false);

  //   const pageEntered = ref(false);

  //   onMounted(() => {
  //     try {
  //       HomeHeroAnimations.init(homeHero.value);
  //       animationSet.value = true;
  //     } catch (error) {
  //       animationSet.value = false;
  //       watch(pageEntered, () => {
  //         HomeHeroAnimations.init(homeHero.value);
  //         animationSet.value = true;
  //       });
  //     }
  //   });

  //   return {
  //     animationSet,
  //     pageEntered,
  //   };
  // },
  // beforeUnmount() {
  //   HomeHeroAnimations.remove();
  // },
};
</script>

<style scoped>
@import url("~/styles/components/Home/HomeHero.pcss");
</style>