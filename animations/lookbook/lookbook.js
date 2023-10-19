import { gsap } from "gsap";
import { Draggable } from "gsap/all";

gsap.registerPlugin(Draggable);

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
    this.galleryContainer = selectFrom(".lookbook-page__gallery", el);
    this.galleryImages = selectAllFrom(".gallery__image", el);
    this.setEnterAnimations();
    config.desktop && this.setDraggable();
  }
}
