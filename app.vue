<template>
  <div class="app-wrapper">
    <site-header v-if="assetsLoaded" />
    <Transition name="preloader">
      <site-preloader
        v-if="!assetsLoaded"
        @assets-loaded="assetsLoaded = true"
      />
    </Transition>
    <!-- <Nuxt-Page v-if="assetsLoaded" /> -->
    <Nuxt-Page
      v-if="assetsLoaded"
      :transition="{
        name: 'page-transition',
        mode: 'out-in',
        onLeave: pageTransitionLeave,
      }"
      :transitioning="transitioning"
    />
  </div>
  <page-transition ref="pageTrans" />
</template>

<script>
import { appAnimations } from "~/animations/app";

export default {
  data() {
    return {
      assetsLoaded: true,
    };
  },
  computed: {},
  setup() {
    const transitioning = ref(false);
    if (process.client) {
      lockScroll(transitioning);
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
          href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap",
          rel: "stylesheet",
        },
      ],
      script: [],
    });
    return {
      transitioning,
    };
  },
  methods: {
    async pageTransitionLeave(el, done) {
      this.transitioning = true;
      await appAnimations.leave(el, done);
      this.transitioning = false;
      console.log("done");
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