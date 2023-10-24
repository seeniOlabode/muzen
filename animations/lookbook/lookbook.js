import { gsap } from "gsap";
import { Draggable, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(Draggable, ScrollTrigger);

import { selectFrom, selectAllFrom } from "~/utils/utils";

export class animations {
  constructor() {
    this.el = null;
    this.elHeading = null;
    this.elHeadingSplit = null;
    this.transitioned = null;
  }

  setEnterAnimations() {
    const tl = gsap.timeline();
    tl.set(this.el, {
      autoAlpha: 1,
    });
    tl.from(
      ".intro__heading__char",
      {
        yPercent: 100,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.05,
      },
      !this.transitioned ? ">+=0.2" : ""
    );
  }

  setParallax() {
    const introGraphicImage = selectFrom(
      ".site-image__image",
      this.introGraphicEl
    );
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.introGraphicEl,
        start: "top 80%",
        end: "bottom 50%",
        scrub: true,
      },
    });
    tl.to(this.introGraphicEl, {
      y: -300,
      ease: "linear",
    });
    tl.fromTo(
      introGraphicImage,
      {
        yPercent: -50,
        ease: "linear",
      },
      {
        yPercent: 50,
        ease: "linear",
      },

      "<"
    );
    tl.to(
      introGraphicImage,
      {
        scale: 1.5,
        ease: "linear",
      },
      "<"
    );
  }

  setDraggable() {
    console.log("draggable set");
    this.draggable ||
      (this.draggable = Draggable.create(this.galleryImages, {
        dragResistance: 0.1,
        bounds: this.galleryContainer,
        zIndexBoost: false,
      }));
  }

  stopDraggable() {
    if (this.draggable) {
      this.draggable.forEach((d) => d.kill());
    }
  }

  init(el, config, transitioned = true) {
    console.log(config);
    this.el = el;
    this.elHeading = selectFrom(".intro__heading", el);
    this.introGraphicEl = selectFrom(
      ".intro__graphic .parallax-site-image__image-wrapper",
      el
    );
    this.galleryContainer = selectFrom(".lookbook-page__gallery", el);
    this.galleryImages = selectAllFrom(".gallery__image", el);
    this.setParallax();
    this.setEnterAnimations();
    config.desktop && this.setDraggable();
  }
}
