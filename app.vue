<template>
  <div>
    <site-preloader />
  </div>
</template>


<script>
export default {
  data() {
    return {
      assetsLoaded: false,
    };
  },
  setup() {
    let gsapLoaded = ref(false);
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
      script: [
        { src: "/assets/gsap/gsap.min.js", tagPosition: "bodyClose" },
        {
          src: "/assets/gsap/CustomEase.js",
          tagPosition: "bodyClose",
          callback: () => {
            gsapLoaded = true;
          },
        },
      ],
    });
    return {
      gsapLoaded,
    };
  },
  mounted() {},
};
</script>

<style scoped>
</style>