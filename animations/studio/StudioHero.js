import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

import { selectFrom, selectAllFrom } from "~/utils/utils";

class animations {
  constructor() {
    this.el = null;
    this.scrollTl = null;
    this.scrollTrigger = null;
    this.transitioned = null;
  }

  setScrollAnimations() {
    this.scrollTl = gsap.timeline();
    this.scrollTrigger = new ScrollTrigger({
      animation: this.scrollTl,
      trigger: this.elVideo,
      start: "bottom bottom",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    });
    this.scrollTl.to(this.elVideo, {
      scale: 2,
      ease: "linear",
    });
  }

  setEnterAnimations() {
    const tl = gsap.timeline();
    tl.set(this.el, {
      autoAlpha: 1,
    });
    tl.from(
      this.logoChars,
      {
        yPercent: 130,
        duration: 0.78,
        ease: "power2.out",
        stagger: {
          each: 0.1,
        },
      },
      !this.transitioned ? ">+=0.5" : ""
    );
  }

  init(el, transitioned = true) {
    this.transitioned = transitioned;
    this.scrollTrigger && this.scrollTrigger.kill();
    this.el = el;
    this.logoChars = selectAllFrom(".studio-hero__logo .logo__char", el);
    this.elVideo = selectFrom(".hero-content__video", el);
    this.setEnterAnimations();
    this.setScrollAnimations();
  }

  remove() {
    this.scrollTl.revert();
    this.scrollTl = null;
    this.scrollTrigger.kill();
  }
}

export const StudioHeroAnimations = new animations();
