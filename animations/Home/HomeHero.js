import { gsap } from "gsap";
import { ScrollTrigger, Draggable } from "gsap/all";
import { SplitText } from "~/assets/gsap-premium/SplitText";

gsap.registerPlugin(ScrollTrigger, Draggable, SplitText);

import { select, selectAllFrom } from "~/utils/utils";

class Animations {
  constructor() {
    this.scrollTl = null;
    this.enterAnimations = null;
    this.el = null;
    this.scrollTrigger = null;
    this.transitioned = null;
  }

  setScrollAnimations() {
    this.scrollTl = gsap.timeline();
    this.scrollTrigger = new ScrollTrigger({
      animation: this.scrollTl,
      trigger: this.el,
      start: "top top",
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
    this.copySplit = new SplitText(this.elCopyBodies, {
      type: "lines,words",
      lineThreshold: 1,
      linesClass: "hero__lines",
      wordsClass: "hero__words",
    });

    const tl = gsap.timeline({
      onComplete: () => {
        // split.revert();
      },
    });
    tl.set(this.el, {
      autoAlpha: 1,
    });
    tl.from(
      this.copySplit.lines,
      {
        yPercent: 100,
        opacity: 0,
        stagger: 0.12,
        duration: 0.5,
      },
      !this.transitioned ? ">+=0.5" : ""
    );
    tl.from(
      this.logoChars,
      {
        yPercent: 130,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
      },
      "<"
    );
    tl.from(".honor__tag", {
      autoAlpha: 0,
    });
  }

  setDraggable() {
    Draggable.create(this.honorTags, {
      bounds: this.elLogo,
      dragResistance: 0.2,
    });
  }

  setResize() {}

  async init(el, transitioned = true) {
    this.transitioned = transitioned;
    this.scrollTrigger && this.scrollTrigger.kill();
    this.el = el;
    this.elVideo = selectFrom(".video-wrapper__video", el);
    this.elLogo = selectFrom(".home-hero__logo", el);
    this.elCopyBodies = selectAllFrom(".copy__body", el);
    this.logoChars = selectAllFrom(".logo__char", el);
    this.honorTags = selectAllFrom(".honor__tag", el);
    this.setScrollAnimations();
    this.setEnterAnimations();
    this.setDraggable();
  }

  remove() {
    this.scrollTl.revert();
    this.scrollTl = null;
    this.scrollTrigger.kill();
  }
}

export const HomeHeroAnimations = new Animations();
