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
    <Transition @leave="footerLeave">
      <site-footer v-show="!['Contact', 'Easter Egg'].includes($route.name)" />
    </Transition>
  </div>
  <page-transition ref="pageTrans" />
</template>

<script>
import { useFavicon } from "@vueuse/core";
import { appAnimations } from "~/animations/app";

useSeoMeta({
  description:
    "Muzen is a fashion photography studio based in Asgard, Nethers. We are dedicated to capturing the essence of style and beauty through our lens. Our passion lies in creating captivating visual stories that elevate fashion to an art form.",
  ogTitle: "Muzen",
  ogDescription:
    "Muzen is a fashion photography studio based in Asgard, Nethers. We are dedicated to capturing the essence of style and beauty through our lens. Our passion lies in creating captivating visual stories that elevate fashion to an art form.",
  ogImage:
    "https://firebasestorage.googleapis.com/v0/b/bode-project-a4bc4.appspot.com/o/muzen-logo.png?alt=media&token=b2b35a96-f809-4b73-af0e-48994baba701",
  ogUrl: "muzen.netlify.com",
  twitterTitle: "Muzen",
  twitterDescription:
    "Muzen is a fashion photography studio based in Asgard, Nethers. We are dedicated to capturing the essence of style and beauty through our lens. Our passion lies in creating captivating visual stories that elevate fashion to an art form.",
  twitterImage:
    "https://firebasestorage.googleapis.com/v0/b/bode-project-a4bc4.appspot.com/o/muzen-logo.png?alt=media&token=b2b35a96-f809-4b73-af0e-48994baba701",
  twitterCard: "A fashion studio",
});

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
      lockScroll(transitioning, "app", true);
      const unwatch = watch(transitioning, (value) => {
        if (value) {
          transitioned.value = true;
        }
      });
    }
    useHead({
      title: "Muzen",
      htmlAttrs: {
        lang: "en",
      },
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
      // return done();
      this.transitioning = true;
      await appAnimations.leave(el, done, this.$route.meta.mitt);
      this.transitioning = false;
    },
    scrollToTop() {
      this.$lenis.setScroll(0);
    },
    footerLeave(el, done) {
      if (this.transitioned) {
        this.$eventBus.on("footer-leave", done);
      } else {
        done();
      }
    },
  },
  mounted() {
    appAnimations.init(this.$refs.pageTrans.$refs.pageTransition, {
      scrollToTop: this.scrollToTop,
    });
  },
};
</script>

<style scoped>
@import url("./styles/app.pcss");
</style>