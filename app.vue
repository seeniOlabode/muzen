<template>
  <div class="app-wrapper">
    <site-header v-if="assetsLoaded" />
    <Transition name="preloader">
      <site-preloader
        v-if="!assetsLoaded"
        @assets-loaded="assetsLoaded = true"
      />
    </Transition>
    <Nuxt-Page
      v-if="assetsLoaded"
      :transition="{
        name: 'page-transition',
        mode: 'out-in',
        onLeave: pageTransitionLeave,
      }"
      :transitioning="transitioning"
      :transitioned="transitioned"
    />
    <site-footer />
  </div>
  <page-transition ref="pageTrans" />
</template>

<script>
import { useFavicon } from "@vueuse/core";
import { appAnimations } from "~/animations/app";

export default {
  provide() {
    return {
      getTransitioned: () => this.transitioned,
    };
  },
  data() {
    return {
      assetsLoaded: true,
    };
  },
  computed: {},
  setup() {
    const transitioning = ref(false);
    const transitioned = ref(false);
    if (process.client) {
      lockScroll(transitioning);
      const unwatch = watch(transitioning, (value) => {
        if (value) {
          unwatch();
          transitioned.value = true;
        }
      });
    }
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
          href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap",
          rel: "stylesheet",
        },
      ],
      script: [],
    });
    return {
      transitioning,
      transitioned,
    };
  },
  methods: {
    async pageTransitionLeave(el, done) {
      // Todo: remove this
      // return done();
      this.transitioning = true;
      await appAnimations.leave(el, done, this.scrollToTop);
      this.transitioning = false;
    },
    scrollToTop() {
      this.$lenis.setScroll(0);
    },
  },
  mounted() {
    appAnimations.init(this.$refs.pageTrans.$refs.pageTransition);
  },
};
</script>

<style scoped>
@import url("./styles/app.pcss");
</style>