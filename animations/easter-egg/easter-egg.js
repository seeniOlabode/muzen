import { gsap } from "gsap";
import { Observer } from "gsap/all";

gsap.registerPlugin(Observer);

import { selectAllFrom } from "~/utils/utils";

class animations {
  constructor() {
    this.el = null;
    this.galleryXWidth = 3000;
    this.galleryYWidth = 2000;
    this.galleryX = null;
    this.galleryY = null;
    this.galleryR = null;
    this.windowX = null;
    this.windowY = null;
    this.windowXCenter = null;
    this.windowYCenter = null;

    this.vel = false;
  }

  startObserver() {
    Observer.create({
      target: window,
      onMove: this.setGalleryCoords.bind(this),
      onStopDelay: 0,
      onStop: () => {
        this.galleryR = 0;
      },
    });
  }

  setupResize() {
    window.onresize = this.setupVariables.bind(this);
  }

  setGalleryCoords(e) {
    this.vel = true;
    const { x, y, velocityX } = e;

    let xPercent = ((x - this.windowXCenter) / this.windowX) * 100;
    let yPercent = ((y - this.windowYCenter) / this.windowY) * 100;
    let velPercent = (velocityX / 500) * 10;

    this.galleryX = (xPercent / 100) * this.galleryXWidth;
    this.galleryY = (yPercent / 100) * this.galleryYWidth;
    this.galleryR = gsap.utils.clamp(-10, 10, velPercent);

    this.galleryX *= -1;
    this.galleryY *= -1;
  }

  setupVariables() {
    this.windowX = window.innerWidth;
    this.windowY = window.innerHeight;
    this.windowXCenter = this.windowX / 2;
    this.windowYCenter = this.windowY / 2;
  }

  setupImageAnimations() {
    const galleryImages = selectAllFrom(".photo-list__photo", this.el);

    galleryImages.forEach((photo, i) => {
      const xSetter = gsap.quickSetter(photo, "x", "px");
      const ySetter = gsap.quickSetter(photo, "y", "px");
      const rSetter = gsap.quickSetter(photo, "rotate", "deg");
      let lerpValue = ((i + 1) / galleryImages.length) * 0.1;
      lerpValue = gsap.utils.clamp(0.05, 0.1, lerpValue);

      let lastX = 0;
      let lastY = 0;
      let lastR = 0;

      const multiplier = i % 2 === 0 ? -1 : 1;

      gsap.ticker.add(() => {
        if (!this.vel) {
          this.galleryR = 0;
        }
        lastX += lerp(lastX, this.galleryX, lerpValue);
        lastY += lerp(lastY, this.galleryY, lerpValue);
        lastR += lerp(lastR, this.galleryR, 0.1);

        xSetter(lastX);
        ySetter(lastY);
        rSetter(lastR * multiplier);

        if (i === galleryImages.length - 1) {
          this.vel = false;
        }
      });
    });
  }

  init(el) {
    this.el = el;
    this.setupVariables();
    this.setupResize();
    this.startObserver();
    this.setupImageAnimations();
  }
}

export const easterEggAnimations = new animations();
