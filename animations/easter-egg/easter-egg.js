import { gsap } from "gsap";
import { Observer, Flip } from "gsap/all";

gsap.registerPlugin(Observer, Flip);

import { selectAllFrom, getBounding } from "~/utils/utils";

class animations {
  constructor() {
    this.el = null;
    this.galleryXWidth = 3000;
    this.galleryYWidth = 2000;
    this.galleryX = null;
    this.galleryY = null;
    // this.galleryR = null;
    this.galleryImages = null;
    this.galleryImageCallbacks = [];
    this.windowX = null;
    this.windowY = null;
    this.windowXCenter = null;
    this.windowYCenter = null;

    // this.vel = false;

    this.previewTl = null;
  }

  startObserver() {
    this.observer = Observer.create({
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
    // this.vel = true;
    const { x, y, velocityX } = e;

    let xPercent = ((x - this.windowXCenter) / this.windowX) * 100;
    let yPercent = ((y - this.windowYCenter) / this.windowY) * 100;
    // let velPercent = (velocityX / 500) * 10;

    this.galleryX = (xPercent / 100) * this.galleryXWidth;
    this.galleryY = (yPercent / 100) * this.galleryYWidth;
    // this.galleryR = gsap.utils.clamp(-10, 10, velPercent);

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
    this.galleryImages = selectAllFrom(".photo-list__photo", this.el);

    this.galleryImages.forEach((photo, i) => {
      const xSetter = gsap.quickSetter(photo, "x", "px");
      const ySetter = gsap.quickSetter(photo, "y", "px");
      // const rSetter = gsap.quickSetter(photo, "rotate", "deg");
      let lerpValue = ((i + 1) / this.galleryImages.length) * 0.1;
      lerpValue = gsap.utils.clamp(0.05, 0.1, lerpValue);

      let lastX = 0;
      let lastY = 0;
      // let lastR = 0;

      // const multiplier = i % 2 === 0 ? -1 : 1;

      const callback = () => {
        lastX += lerp(lastX, this.galleryX, lerpValue);
        lastY += lerp(lastY, this.galleryY, lerpValue);

        xSetter(lastX);
        ySetter(lastY);
      };

      this.galleryImageCallbacks.push(callback);
      gsap.ticker.add(callback);
    });
  }

  openPreview(photoEl, previewEl) {
    return new Promise((r) => {
      const photoElBox = getBounding(photoEl);
      const previewElBox = getBounding(previewEl);

      const deltaX = previewElBox.left - photoElBox.left;
      const deltaY = previewElBox.top - photoElBox.top;
      const deltaScale = 500 / photoElBox.width;

      this.previewTl = gsap
        .timeline({
          paused: true,
          onComplete: () => {
            r();
          },
        })
        .set([this.previewContainerEl, previewEl], {
          autoAlpha: 0,
        })
        .to(photoEl, {
          x: deltaX,
          y: deltaY,
          scale: deltaScale,
          duration: 0.6,
        })
        .to(
          this.previewContainerEl,
          {
            autoAlpha: 1,
          },
          ">-=0.2"
        )
        .set(previewEl, { autoAlpha: 1 })
        .set(photoEl, { autoAlpha: 0 })
        .play();
    });
  }

  closePreview() {
    return new Promise((r) => {
      if (this.previewTl) {
        this.previewTl.reverse();
      }
      r();
    });
  }

  stop() {
    this.observer.disable();
  }

  init(el) {
    this.el = el;
    this.previewContainerEl = selectFrom(".easter-egg__preview", el);
    this.setupVariables();
    this.setupResize();
    this.startObserver();
    this.setupImageAnimations();
    // this.stop();
  }
}

export const easterEggAnimations = new animations();
