import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

class animations {
  constructor() {
    this.scrollTl = null;
    this.enterAnimations = null;
    this.el = null;
  }

  setScrollAnimations() {
    this.scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: this.el,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
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

    this.scrollTl.to(
      this.elCopyBody,
      {
        y: 100,
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

  init(el) {
    console.log(el);
    this.el = el;
    this.elVideo = selectFrom(".video-wrapper__video", el);
    this.elLogo = selectFrom(".home-hero__logo", el);
    this.elCopyBody = selectFrom(".copy__body", el);
    // this.logoChars = selectAllFrom(".logo__char", el);
    this.setScrollAnimations();
    console.log(this);
  }

  remove() {
    this.scrollTl.revert();
    this.scrollTl = null;
  }
}

export const HomeHeroAnimations = new animations();
