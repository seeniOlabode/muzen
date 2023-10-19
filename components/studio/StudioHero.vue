<template>
  <section class="studio-hero animated-block" ref="studioHero">
    <h1 class="studio-hero__logo">
      <span
        v-for="(char, i) in 'Muzen'.split('')"
        :key="char + i"
        class="logo__char"
        >{{ char }}</span
      >
    </h1>
    <div class="studio-hero__hero-content">
      <p class="hero-content__copy body">
        We are passionate about capturing the essence of fashion through the
        lens, and our dedicated team of talented photographers is here to bring
        your vision to life.
      </p>
      <div class="hero-content__video-wrapper">
        <video class="hero-content__video" autoplay loop>
          <source src="/images/Studio/studio-video-trimmed.webm" />
        </video>
      </div>
    </div>

    <div class="studio-hero__heading">
      <span>Studio</span>
      <span class="heading__year">2023</span>
    </div>
  </section>
</template>

<script>
import { StudioHeroAnimations } from "~/animations/studio/StudioHero";

import { emitter as $eventBus } from "../../plugins/event-bus.js";

export default {
  inject: ["getTransitioned"],
  computed: {
    transitioned() {
      return this.getTransitioned();
    },
  },
  setup() {
    const studioHero = ref(null);

    function callback1() {
      StudioHeroAnimations.init(studioHero.value, false);
    }

    function callback2() {
      $eventBus.on("studio-enter-animations", () => {
        StudioHeroAnimations.init(studioHero.value);
        $eventBus.off("studio-enter-animations");
      });
    }

    useMuzenEnter(callback1, callback2);

    return {
      studioHero,
    };
  },
};
</script>

<style scoped>
.studio-hero__logo {
  margin-top: 44px;
  font-family: var(--muzen-nohemi);
  font-size: 27.5vw;
  display: flex;
  justify-content: space-between;
  line-height: 0.6;
  padding-top: 100px;
  overflow: hidden;
  letter-spacing: 2.5px;
  position: relative;
  right: 4px;
  color: var(--muzen-dark-brown);
}

.studio-hero__hero-content {
  aspect-ratio: 396/348;
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: end;
  padding: 16px;
  margin-top: 24px;
  position: relative;
  z-index: 10;
}

.hero-content__copy {
  font-size: 14px;
  font-weight: 500;
  color: white;
  margin-bottom: 10%;
  max-width: 95%;
  position: relative;
  z-index: 20;
}

.hero-content__video-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 10;
  overflow: hidden;
  background-image: url("/images/Preloader/khaled-ghareeb-rBdkjxJlRaI-unsplash.webp");
  background-size: cover;
  background-repeat: no-repeat;
}

.hero-content__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: none;
}

.studio-hero__heading {
  font-family: var(--muzen-nohemi);
  font-weight: 400;
  font-size: 12vw;
  display: flex;
  justify-content: space-between;
  line-height: 0.55;
  padding-top: 2%;
  margin-top: 40px;
}

.heading-copyright {
  font-size: 30%;
}

.heading__year::after {
  content: "(c)";
  font-size: 30%;
  position: relative;
  bottom: 10%;
  font-weight: 400;
  font-family: var(--muzen-nohemi);
}

@media screen and (width >= 500px) {
  .studio-hero__logo {
    font-size: 28vw;
  }
}

@media screen and (width >= 724px) {
  .studio-hero__logo {
    margin-top: 72px;
    font-size: 28vw;
  }

  .studio-hero__hero-content {
    margin-top: 40px;
    aspect-ratio: 1376/720;
    background-position: 0 20%;
  }

  .hero-content__copy {
    font-size: 20px;
    max-width: 500px;
  }

  .studio-hero__heading {
    margin-top: 120px;
  }

  .hero-content__video-wrapper {
    background: none;
  }

  .hero-content__video {
    display: block;
  }
}

@media screen and (width >= 900px) {
  .studio-hero__logo {
    font-size: 29vw;
  }
}

@media screen and (width >= 1200px) {
  .studio-hero__logo {
    font-size: 29.5vw;
  }
}
</style>