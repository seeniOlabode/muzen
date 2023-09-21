import { gsap } from "gsap";
import { ScrollTrigger, CustomEase, Draggable } from "gsap/all";
import { SplitText } from "~/assets/gsap-premium/SplitText";

gsap.registerPlugin(ScrollTrigger, CustomEase, Draggable, SplitText);

import { selectAllFrom, elementHasWidth } from "~/utils/utils";

class Animations {
  constructor() {
    this.scrollTl = null;
    this.enterAnimations = null;
    this.el = null;
    this.scrollTrigger = null;
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
    const split = new SplitText(this.elCopyBodies, {
      type: "lines,words",
      lineThreshold: 1,
      linesClass: "hero__lines",
      wordsClass: "hero__words",
    });

    const splitLines = split.lines;
    const tl = gsap.timeline();
    tl.addLabel("start");

    splitLines.forEach((line, i) => {
      const words = selectAllFrom(".hero__words", line);
      tl.from(
        words,
        {
          yPercent: 150,
        },
        "start+=" + i * 0.1
      );
    });

    this.enterAnimations = gsap.timeline();
    this.enterAnimations.from(this.logoChars, {
      yPercent: 100,
      duration: 1,
      stagger: 0.15,
      ease: "power2.out",
    });
  }

  setDraggable() {
    Draggable.create(this.honorTags, {
      bounds: this.elLogo,
      dragResistance: 0.2,
    });
  }

  async init(el) {
    this.scrollTrigger && this.scrollTrigger.kill();
    this.enterAnimations && this.enterAnimations.kill();
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
