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
    CustomEase.create("reveal-image", "M0,0 C0,0.16 0.5,1 1,1 ");
    this.imageCovers.forEach((cover, i) => {
      const image = this.images[i];
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cover.parentElement,
          start: "top 60%",
        },
      });
      tl.to(cover, {
        yPercent: 100,
        duration: 1,
        ease: "reveal-image",
      })
        .from(
          image,
          {
            scale: 2,
            duration: 1,
            ease: "reveal-image",
          },
          "<"
        )
        .set(cover, {
          display: "none",
        });
    });
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
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 70%",
          },
          onComplete: () => {
            split.revert();
          },
        });
        tl.addLabel("start");
        splitLines.forEach((line, i) => {
          const words = selectAllFrom(".child__words", line);
          tl.from(
            words,
            {
              yPercent: 150,
              rotate: 10,
              // delay: i * 0.1,
              // scrollTrigger: {
              //   trigger: row,
              //   start: "top 70%",
              // },
            },
            `start+=${i * 0.1})`
          );
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
    this.imageCovers = selectAllFrom(
      ".reveal-site-image .reveal-site-image__cover",
      el
    );
    this.parallaxRow = selectFrom(".row.parallax", el);
    this.parallaxImage = selectFrom(".reveal-site-image.parallax", el);
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
