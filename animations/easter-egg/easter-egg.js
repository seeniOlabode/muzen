import { gsap } from "gsap";
import { Observer } from "gsap/all";

gsap.registerPlugin(Observer);

import { selectFrom, selectAllFrom } from "~/utils/utils";

export class animations {
  constructor() {
    this.el = null;
    this.galleryXWidth = 3000;
    this.galleryYWidth = 2000;
    this.galleryX = null;
    this.galleryY = null;
    this.galleryImages = null;
    this.galleryImageCallbacks = [];
    this.windowX = null;
    this.windowY = null;
    this.windowXCenter = null;
    this.windowYCenter = null;
    this.stopped = false;

    this.previewTl = null;
  }

  startObserver() {
    this.observer && this.observer.kill();
    this.observer = Observer.create({
      target: window,
      onMove: this.setGalleryCoords.bind(this),
      onStopDelay: 0,
    });
  }

  setupResize() {
    window.onresize = this.setupVariables.bind(this);
  }

  setGalleryCoords(e) {
    const { x, y } = e;

    let xPercent = ((x - this.windowXCenter) / this.windowX) * 100;
    let yPercent = ((y - this.windowYCenter) / this.windowY) * 100;

    this.galleryX = (xPercent / 100) * this.galleryXWidth;
    this.galleryY = (yPercent / 100) * this.galleryYWidth;

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
      const xVarSetter = gsap.quickSetter(photo, "--x", "px");
      const yVarSetter = gsap.quickSetter(photo, "--y", "px");
      let lerpValue = ((i + 1) / this.galleryImages.length) * 0.1;
      lerpValue = gsap.utils.clamp(0.05, 0.1, lerpValue);

      let lastX = 0;
      let lastY = 0;

      const callback = () => {
        if (!this.stopped) {
          lastX += lerp(lastX, this.galleryX, lerpValue);
          lastY += lerp(lastY, this.galleryY, lerpValue);

          xVarSetter(lastX);
          yVarSetter(lastY);
        }
      };

      this.galleryImageCallbacks.push(callback);
      gsap.ticker.add(callback);
    });
  }

  start() {
    this.observer.enable();
    this.stopped = false;
    return this;
  }

  stop() {
    this.stopped = true;
    this.observer.disable();
    return this;
  }

  init(el) {
    this.observer && this.start();
    this.el = el;
    this.elPhotoList = selectFrom(".easter-egg-page__photo-list", el);
    this.elPreview = selectFrom(".easter-egg-page__preview-container", el);
    this.elPreviewBackdrop = selectFrom(".preview-container__backdrop", el);
    this.setupVariables();
    this.setupResize();
    this.startObserver();
    this.setupImageAnimations();
  }
}
