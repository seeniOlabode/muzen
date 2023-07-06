import { gsap } from "gsap";

class animations {
  constructor() {
    this.el = null;
    this.elBg = null;
    this.elLogoChars = null;
    this.elSiteLinks = null;
    this.enterTl = null;
    this.leaveTl = null;
  }

  enter(_, done) {
    this.enterTl = gsap
      .timeline({
        onComplete: () => {
          done();
        },
      })
      .from(this.elBg, {
        autoAlpha: 0,
      })
      .from(
        this.elLogoChars,
        {
          yPercent: 150,
          duration: 0.3,
          stagger: 0.15,
          ease: "power2.out",
        },
        "<+0.1"
      )
      .from(
        this.elSiteLinks,
        {
          yPercent: 150,
          duration: 0.3,
          ease: "power2.out",
          rotate: 10,
          stagger: {
            each: 0.15,
            from: "end",
          },
        },
        "<"
      );
  }

  leave(_, done) {
    this.leaveTl = gsap
      .timeline({
        onComplete: () => {
          done();
          this.leaveTl.revert();
        },
        defaults: {
          onInterrupt: () => {
            done();
            alert("ahh");
            this.leaveTl.revert();
          },
        },
      })
      .to(this.elSiteLinks, {
        rotate: 10,
        yPercent: 150,
        duration: 0.3,
        ease: "power2.in",
        stagger: {
          each: 0.15,
          from: "start",
        },
      })
      .to(
        this.elLogoChars,
        {
          autoAlpha: 0,
          duration: 0.25,
          ease: "linear",
        },
        "<"
      )
      .to(
        this.el,
        {
          autoAlpha: 0,
        },
        "<"
      );
  }

  init(el) {
    this.el = el;
    this.elBg = selectFrom(".menu-container__bg", el);
    this.elLogoChars = selectAllFrom(".logo__char", el);
    this.elSiteLinks = selectAllFrom(".site-link", el);
  }
}

export const menuAnimations = new animations();
