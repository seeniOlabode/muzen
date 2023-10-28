import { gsap } from "gsap";
import { Draggable, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(Draggable, ScrollTrigger);

import { selectFrom, selectAllFrom, addDOMEventWatcher } from "~/utils/utils";

export class animations {
  constructor() {
    this.el = null;
    this.elHeading = null;
    this.elHeadingSplit = null;
    this.transitioned = null;
    this.parrallaxTl = null;
    this.unwatchResize = null;
  }

  setEnterAnimations() {
    const tl = gsap.timeline({
      onComplete: () => {},
    });
    tl.set(this.el, {
      autoAlpha: 1,
    }).from(
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
    this.parrallaxTl = gsap
      .timeline({
        scrollTrigger: {
          trigger: this.introGraphicEl,
          start: "top 80%",
          end: "bottom 10%",
          scrub: true,
        },
      })
      .to(this.introGraphicEl, {
        y: -300,
        ease: "linear",
      })
      .fromTo(
        this.introGraphicImage,
        {
          yPercent: -50,
          ease: "linear",
          scale: 1,
        },
        {
          yPercent: 50,
          ease: "linear",
          scale: 1.5,
        },

        "<"
      );

    this.setupResize();
  }

  setupResize() {
    this.unwatchResize && this.unwatchResize();
    this.unwatchResize = addDOMEventWatcher({
      el: window,
      event: "resize",
      callback: function (e) {
        if (e.target.innerWidth < 724) {
          this.parrallaxTl &&
            (this.parrallaxTl.revert().kill() || (this.parrallaxTl = null));
        } else {
          this.parrallaxTl || this.setParallax();
        }
      }.bind(this),
    });
  }

  setDraggable() {
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

  kill() {
    this.unwatchResize && this.unwatchResize();
  }

  init(el, config, transitioned = true) {
    this.el = el;
    this.elHeading = selectFrom(".intro__heading", el);
    this.introGraphicEl = selectFrom(
      ".intro__graphic .parallax-site-image__image-wrapper",
      el
    );
    this.galleryContainer = selectFrom(".lookbook-page__gallery", el);
    this.galleryImages = selectAllFrom(".gallery__image", el);
    this.introGraphicImage = selectFrom(
      ".site-image__image",
      this.introGraphicEl
    );
    config.desktop && this.setParallax();
    this.setEnterAnimations();
    config.desktop && this.setDraggable();
  }
}
