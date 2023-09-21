import { gsap } from "gsap";
import { ScrollTrigger, CustomEase, Draggable } from "gsap/all";
import { SplitText } from "~/assets/gsap-premium/SplitText";

gsap.registerPlugin(ScrollTrigger, CustomEase, Draggable, SplitText);

import { selectFrom, selectAllFrom, elementHasWidth } from "~/utils/utils";

class animations {
  constructor() {
    this.el = null;
    this.scrollTl = null;
    this.scrollTrigger = null;
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
    gsap.from(this.logoChars, {
      yPercent: 120,
      duration: 0.55,
      ease: "power2.out",
      stagger: {
        each: 0.15,
      },
    });
  }

  init(el) {
    console.log(this);
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
