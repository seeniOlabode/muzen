import { gsap } from "gsap";
import { ScrollTrigger, CustomEase, Draggable } from "gsap/all";
import { SplitText } from "~/assets/gsap-premium/SplitText";

gsap.registerPlugin(ScrollTrigger, CustomEase, Draggable, SplitText);

import { selectFrom, selectAllFrom, elementHasWidth } from "~/utils/utils";

class animations {
  constructor() {
    this.el = null;
    this.elHeading = null;
    this.elHeadingSplit = null;
  }

  setEnterAnimations() {
    gsap.from(this.elHeadingSplit.chars, {
      yPercent: 100,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.05,
    });
  }

  setDraggable() {
    this.draggable = Draggable.create(this.galleryImages, {
      dragResistance: 0.1,
      bounds: this.galleryContainer,
      zIndexBoost: false,
    });
  }

  stopDraggable() {
    if (this.draggable) {
      console.log(this.draggable);
      this.draggable.forEach((d) => d.kill());
    }
  }

  init(el, config) {
    this.el = el;
    this.elHeading = selectFrom(".intro__heading", el);
    this.elHeadingSplit = new SplitText(this.elHeading, {
      type: "lines,words,chars",
      charsClass: "intro__heading__chars",
      linesClass: "intro__heading__lines",
    });
    this.galleryContainer = selectFrom(".lookbook-page__gallery", el);
    this.galleryImages = selectAllFrom(".gallery__image", el);
    this.setEnterAnimations();
    console.log(config);
    config.desktop && this.setDraggable();
  }
}

export const LookbookAnimations = new animations();
