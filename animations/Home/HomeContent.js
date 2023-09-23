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
    // const toScale = window.innerWidth / this.scaledImg.clientWidth;
    // gsap.to(this.scaledImg, {
    //   scale: toScale,
    //   transformOrigin: "center",
    //   scrollTrigger: {
    //     trigger: this.scaledImg,
    //     start: "top bottom",
    //     end: "top 20%",
    //     scrub: true,
    //     pin: true,
    //     pinReparent: true,
    //   },
    // });
  }

  init(el) {
    this.el = el;
    this.rows = selectAllFrom(".row", el);
    this.images = selectAllFrom(
      ".site-image__image-wrapper:not(.home-content__scaled-image) .site-image__image",
      el
    );
    this.parallaxRow = selectFrom(".row.parallax", el);
    this.parallaxImage = selectFrom(".site-image__image-wrapper.parallax", el);
    this.scaledImg = selectFrom(
      ".row:nth-child(6) .site-image__image-wrapper.home-content__scaled-image",
      el
    );
    this.setParallax();
  }

  destroy() {
    ScrollTrigger.killAll();
  }
}

export const HomeContentAnimations = new Animations();
