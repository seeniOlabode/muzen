// import Lenis from "@studio-freight/lenis";

// const defaultConfig = {
//   gsapScroll: false,
// };

// let lenis;

// async function setupLenis() {
//   lenis = new Lenis({
//     lerp: 0.1,
//     autoResize: true,
//   });

//   function raf(time) {
//     lenis.raf(time);
//     requestAnimationFrame(raf);
//   }

//   requestAnimationFrame(raf);

//   const gsap = await import("gsap").then((module) => module.gsap);
//   const ScrollTrigger = await import("gsap/ScrollTrigger").then(
//     (module) => module.default
//   );
//   gsap.registerPlugin(ScrollTrigger);
//   lenis.on("scroll", ScrollTrigger.update);
//   gsap.ticker.add((time) => {
//     lenis.raf(time * 1000);
//   });
//   gsap.ticker.lagSmoothing(0);
// }

// if (process.client) {
//   setupLenis;
// }

// export function useSmoothScroll(config = defaultConfig) {
//   onMounted(async () => {
//     if (config.gsapScroll) {
//     }
//   });

//   onBeforeUnmount(() => {
//     lenis.destroy();
//   });
// }

// export const lenis;
