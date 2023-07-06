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
        trigger: ".home-hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    this.scrollTl.to(".video-wrapper__video", {
      scale: 2,
    });

    this.scrollTl.to(
      ".home-hero__logo",
      {
        y: -100,
      },
      "<"
    );

    this.scrollTl.to(
      ".copy__body",
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
    this.el = el;
    this.logoChars = selectAllFrom(".logo__char", el);
    this.setEnterAnimations();
    this.setScrollAnimations();
    gsap.set(el, {
      autoAlpha: 1,
    });
  }

  remove() {
    this.scrollTl.revert();
    this.scrollTl.kill();
    this.scrollTl = null;
  }
}

export const HomeHeroAnimations = new animations();
