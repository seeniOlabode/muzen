import { gsap } from "gsap";
import { ScrollTrigger, CustomEase, Draggable } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, CustomEase, Draggable);

class animations {
  constructor() {
    this.scrollTl = null;
    this.enterAnimations = null;
    this.el = null;
    this.scrollTrigger = null;
  }

  setScrollAnimations() {
    this.scrollTl = gsap.timeline();
    this.scrollTrigger = new ScrollTrigger({
      animation: this.scrollTl,
      trigger: this.el,
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    });

    this.scrollTl.to(this.elVideo, {
      scale: 2,
    });

    this.scrollTl.to(
      this.elLogo,
      {
        y: -100,
      },
      "<"
    );
  }

  setEnterAnimations() {
    this.enterAnimations = gsap.timeline();
    this.enterAnimations
      .from(this.logoChars, {
        yPercent: 100,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
      })
      .from(
        this.bodyWrappers,
        {
          yPercent: 100,
          duration: 0.5,
          delay: 0.3,
          stagger: {
            each: 0.05,
            from: "end",
          },
          ease: "power2.out",
        },
        "<"
      );
  }

  setDraggable() {
    Draggable.create(this.honorTags, {
      bounds: this.elLogo,
      dragResistance: 0.2,
    });
  }

  checkWidth(el) {
    return el.clientWidth > 1;
  }

  async init(el) {
    console.log(el);
    this.scrollTrigger && this.scrollTrigger.kill();
    this.enterAnimations && this.enterAnimations.kill();
    const callback = (r) => {
      if (this.checkWidth(el)) {
        this.el = el;
        this.elVideo = selectFrom(".video-wrapper__video", el);
        this.elLogo = selectFrom(".home-hero__logo", el);
        this.elCopyBody = selectFrom(".copy__body", el);
        this.bodyWrappers = selectAllFrom(".body__wrapper", el);
        this.logoChars = selectAllFrom(".logo__char", el);
        this.honorTags = selectAllFrom(".honor__tag", el);
        this.setScrollAnimations();
        this.setEnterAnimations();
        this.setDraggable();
        r();
      } else {
        console.log("check");
        setTimeout(callback, 500, r);
      }
    };
    return new Promise((r) => {
      callback(r);
    });
  }

  remove() {
    this.scrollTl.revert();
    this.scrollTl = null;
    this.scrollTrigger.kill();
  }
}

export const HomeHeroAnimations = new animations();
