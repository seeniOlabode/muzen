import { gsap } from "gsap";
import ScrollTrigger from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

class animations {
  constructor() {}

  logoIn() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".site-footer",
        start: "bottom 130%",
      },
    });

    tl.from(".site-footer__logo .logo__char", {
      yPercent: 150,
      duration: 1,
      ease: "power2.out",
      stagger: {
        each: 0.15,
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
