import { selectFrom, selectAllFrom } from "~/utils/utils";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

class Animations {
  constructor() {
    this.el = null;
    this.images = null;
    this.parallaxImage = null;
    this.scaledImg = null;
    this.setup = false;
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
    gsap.from(this.parallaxImage, {
      y: 150,
      ease: "linear",
      scrollTrigger: {
        trigger: this.parallaxRow,
        start: "top bottom",
        end: "top top",
        scrub: true,
        id: "parallax",
      },
    });
  }

  init(el, desktop) {
    if (!desktop) {
      return;
    }
    this.el = el;
    this.rows = selectAllFrom(".row", el);
    this.images = selectAllFrom(
      ".parallax-site-image__image-wrapper:not(.home-content__scaled-image) .site-image__image",
      el
    );
    this.parallaxRow = selectFrom(".row.parallax", el);
    this.parallaxImage = selectFrom(
      ".parallax-site-image__image-wrapper.parallax",
      el
    );
    setTimeout(() => {
      // Crutch: The Parallax doesn't work immediately if I don't do this;
      this.setParallax();
    }, 0);
  }

  destroy() {
    ScrollTrigger.killAll();
  }
}

export const HomeContentAnimations = new Animations();
