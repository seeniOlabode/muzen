import {
  select,
  selectFrom,
  selectAllFrom,
  recursiveStagger,
} from "~/utils/utils";

import { gsap } from "gsap";
import { ScrollTrigger, CustomEase } from "gsap/all";
import { SplitText } from "~/assets/gsap-premium/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

class Animations {
  constructor() {
    this.el = null;
    this.images = null;
    this.parallaxImage = null;
    this.scaledImg = null;
  }

  setParallax() {
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

  init(el) {
    this.el = el;
    this.rows = selectAllFrom(".row", el);
    console.log(this.rows);
    this.images = selectAllFrom(
      ".site-image__image-wrapper .site-image__image",
      el
    );
    this.parallaxRow = selectFrom(".row.parallax", el);
    this.parallaxImage = selectFrom(".site-image__image-wrapper.parallax", el);
    this.scaledImg = selectFrom(
      ".row:nth-child(5) .site-image__image-wrapper",
      el
    );
    console.log(this.scaledImg);
    this.setParallax();
  }

  destroy() {
    ScrollTrigger.killAll();
  }
}

export const HomeContentAnimations = new Animations();
