import Lenis from "@studio-freight/lenis";
import "~/styles/plugins/lenis.css";

export let lenis;

async function setupLenis() {
  lenis = new Lenis({
    lerp: 0.1,
    autoResize: true,
  });

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
}

if (process.client) {
  setupLenis();
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("lenis", lenis);
});
