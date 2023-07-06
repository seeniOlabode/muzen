import Lenis from "@studio-freight/lenis";

const defaultConfig = {
  gsapScroll: false,
};

export default function (config = defaultConfig) {
  const lenis = new Lenis({
    lerp: 0.1,
    autoResize: true,
  });

  onMounted(async () => {
    if (config.gsapScroll) {
      const gsap = await import("gsap").then((module) => module.gsap);
      const ScrollTrigger = await import("gsap/ScrollTrigger").then(
        (module) => module.default
      );
      gsap.registerPlugin(ScrollTrigger);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }
  });

  // onUnmounted(() => {
  //   lenis.destoy();
  // });
}
