<template>
  <div class="app-wrapper">
    <site-header />
    <Transition name="preloader">
      <site-preloader
        v-if="!assetsLoaded"
        @assets-loaded="assetsLoaded = true"
      />
    </Transition>
    <Nuxt-Page :transition="{ mode: 'out-in', onLeave: pageTransitionLeave }" />
    <!-- <NuxtPage /> -->
  </div>

  <div class="page-transition" ref="pageTransition">
    <div class="page-transition__content">
      <h2 class="content__logo">
        <span
          class="logo__char"
          v-for="(char, i) in logoTextSplit"
          :key="char + i + 'page-transition'"
        >
          {{ char }}
        </span>
      </h2>
    </div>
  </div>
</template>

<script>
import { selectFrom, selectAllFrom } from "./utils/utils";

import { gsap } from "gsap";
import { CustomEase } from "gsap/all";

export default {
  data() {
    return {
      assetsLoaded: false,
    };
  },
  computed: {
    logoTextSplit() {
      return "Muzen".split("");
    },
  },
  setup() {
    useHead({
      title: "Muzen",
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: true,
        },
        {
          href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap",
          rel: "stylesheet",
        },
      ],
      script: [],
    });
  },
  methods: {
    pageTransitionLeave,
  },
};

function pageTransitionLeave(el, done) {
  const tl = gsap.timeline({
    puased: true,
    onComplete: () => {
      tl.revert();
    },
  });

  let pageOutease = CustomEase.create(
    "custom",
    "M0,0 C0.25,0 0.294,0.023 0.335,0.05 0.428,0.11 0.466,0.292 0.498,0.502 0.532,0.73 0.566,0.788 0.62,0.836 0.659,0.87 0.698,1 1,1 "
  );

  const pageTransition = this.$refs.pageTransition;
  const pageTransitionContent = selectFrom(
    ".page-transition__content",
    pageTransition
  );
  const pageTransitionLogoChars = selectAllFrom(".logo__char", pageTransition);

  tl.set(pageTransition, {
    autoAlpha: 1,
  });

  tl.from(pageTransition, {
    yPercent: -100,
    duration: 1,
    ease: "expo.inOut",
  });

  tl.from(
    pageTransitionContent,
    {
      yPercent: 100,
      duration: 1,
      ease: "expo.inOut",
    },
    "<"
  );

  tl.from(
    pageTransitionLogoChars,
    {
      yPercent: 100,
      duration: 0.5,
      ease: "power2.out",
      stagger: {
        each: 0.2,
      },
    },
    "<+0.5"
  );

  tl.call(() => {
    done();
  });

  tl.to(
    pageTransitionLogoChars,
    {
      yPercent: -100,
      duration: 0.3,
      ease: "power1.in",
      stagger: {
        each: 0.05,
      },
    },
    ">+=1"
  );

  tl.to(
    pageTransition,
    {
      yPercent: 100,
      duration: 1,
      ease: pageOutease,
    },
    ">"
  );

  tl.from(
    pageTransitionContent,
    {
      yPercent: -100,
      duration: 1,
      ease: pageOutease,
    },
    "<"
  );

  tl.play();
}
</script>

<style scoped>
@import url("./styles/app.pcss");
</style>