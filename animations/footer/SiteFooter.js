import { gsap } from "gsap";
import ScrollTrigger from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

class animations {
  constructor() {}

  logoIn() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".site-footer",
        start: "clamp(bottom 101%)",
      },
    });

    tl.from(".site-footer__logo .logo__char", {
      yPercent: 150,
      duration: 0.7,
      ease: "credits-in",
      stagger: {
        each: 0.12,
      },
    }).from(
      ".site-footer .creators__credit",
      {
        autoAlpha: 0,
        duration: 1,
      },
      ">-=0.15"
    );
  }
}

export const footerAnimations = new animations();
