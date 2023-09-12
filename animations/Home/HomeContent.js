import {
  select,
  selectFrom,
  selectAllFrom,
  recursiveStagger,
} from "~/utils/utils";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from "~/assets/gsap-premium/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText);

class Animations {
  constructor() {
    this.el = null;
    this.images = null;
    this.parallaxImage = null;
    this.scaledImg = null;
  }

  setParallax() {
    this.images.forEach((image) => {
      function reveal() {
        const tl = gsap.timeline({
          // onComplete: startParallax,
          // repeat: -1,
          scrollTrigger: {
            trigger: image.parentElement.parentElement,
            start: "top 60%",
          },
        });
        tl.from(image.parentElement, {
          yPercent: -200,
          duration: 1,
        });
        tl.from(
          image,
          {
            yPercent: 200,
            scale: 2,
            duration: 1,
          },
          "<"
        );
      }
      function startParallax() {
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
      }
      reveal();
    });
    // TODO: change this
    // gsap.from(this.parallaxImage, {
    //   y: 150,
    //   ease: "linear",
    //   scrollTrigger: {
    //     trigger: this.parallaxRow,
    //     start: "top bottom",
    //     end: "top top",
    //     scrub: true,
    //     id: "parallax",
    //   },
    // });

    // gsap.from(this.scaledImg, {
    //   scrollTrigger: {
    //     trigger: this.scaledImg,
    //     start: "top bottom",
    //     end: "bottom top",
    //     // scrub: true,
    //     // pin: true,
    //   },
    //   scale: window.innerWidth / this.scaledImg.clientWidth,
    //   ease: "linear",
    // });
  }

  setReveal() {
    this.rows.forEach((row) => {
      const headings = selectAllFrom(
        '[class*="heading"] .animation-wrapper',
        row
      );
      const els = selectAllFrom([".body"], row);
      if (headings.length) {
        gsap.from(headings[0], {
          yPercent: 200,
          rotate: 10,
          scrollTrigger: {
            trigger: row,
            start: "top 70%",
          },
        });
      }
      if (els.length) {
        const split = new SplitText(els, {
          type: "lines,words",
          lineThreshold: 0.8,
          linesClass: "child__lines",
          wordsClass: "child__words",
        });
        const splitLines = split.lines;
        splitLines.forEach((line, i) => {
          const words = selectAllFrom(".child__words", line);
          gsap.from(words, {
            yPercent: 150,
            rotate: 10,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: row,
              start: "top 70%",
            },
          });
        });
      }
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
    this.setReveal();
  }

  destroy() {
    ScrollTrigger.killAll();
  }
}

export const HomeContentAnimations = new Animations();
