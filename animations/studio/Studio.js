import { selectFrom, selectAllFrom } from "~/utils/utils";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

class Animations {
  constructor() {
    this.images = null;
    this.setup = null;
  }

  setParallax() {
    this.setup = true;
    this.images.forEach((image) => {
      gsap.from(image, {
        yPercent: -50,
        ease: "linear",
        scrollTrigger: {
          trigger: image,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }

  init(el, desktop) {
    if (!desktop) {
      return;
    }

    this.images = selectAllFrom(
      ".parallax-site-image__image-wrapper .site-image__image",
      el
    );
    setTimeout(() => {
      // Crutch: The Parallax doesn't work immediately if I don't do this;
      this.setParallax();
    }, 0);
  }
}

export const StudioAnimations = new Animations();
