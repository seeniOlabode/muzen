import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

class animations {
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
    });

    this.scrollTl.to(
      this.elLogo,
      {
        y: -100,
      },
      "<"
    );
  }

  setEnterAnimations() {
    this.enterAnimations = gsap.timeline();
    this.enterAnimations.from(this.logoChars, {
      yPercent: 100,
      duration: 0.5,
      stagger: 0.2,
      ease: "power2.out",
    });
  }

  checkWidth(el) {
    return el.clientWidth > 1;
  }

  async init(el) {
    this.scrollTrigger && this.scrollTrigger.kill();
    this.enterAnimations && this.enterAnimations.kill();
    const callback = (r) => {
      if (this.checkWidth(el)) {
        this.el = el;
        this.elVideo = selectFrom(".video-wrapper__video", el);
        this.elLogo = selectFrom(".home-hero__logo", el);
        this.elCopyBody = selectFrom(".copy__body", el);
        this.setScrollAnimations();
        r();
      } else {
        console.log("check");
        setTimeout(callback, 500, r);
      }
    };
    return new Promise((r) => {
      callback(r);
    });
  }

  remove() {
    this.scrollTl.revert();
    this.scrollTl = null;
    this.scrollTrigger.kill();
  }
}

export const HomeHeroAnimations = new animations();
