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

  async enter(_, done) {
    return new Promise((r) => {
      this.enterTl = gsap
        .timeline({
          onComplete: () => {
            done();
            r();
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
    });
  }

  async leave(_, done) {
    return new Promise((r) => {
      this.leaveTl = gsap
        .timeline({
          onComplete: () => {
            done();
            r();
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
    });
  }

  init(el) {
    this.el = el;
    this.elBg = selectFrom(".menu-container__bg", el);
    this.elLogoChars = selectAllFrom(".logo__char", el);
    this.elSiteLinks = selectAllFrom(".site-link", el);
  }
}

export const menuAnimations = new animations();
