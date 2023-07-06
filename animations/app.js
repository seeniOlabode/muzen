import { gsap } from "gsap";
import { ScrollTrigger, CustomEase } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, CustomEase);

import { selectAllFrom } from "~/utils/utils";

class animations {
  constructor() {
    this.el = null;
    this.elContent = null;
    this.elLogoChars = null;
    this.leaveTl = null;
  }

  async leave(_, done) {
    return new Promise((r) => {
      if (this.leaveTl) {
        return this.leaveTl.restart();
      }

      this.leaveTl = gsap
        .timeline({
          puased: true,
          onComplete: () => {
            r();
          },
        })
        .set(this.el, {
          autoAlpha: 1,
        })
        .from(this.el, {
          yPercent: -100,
          duration: 1,
          ease: "smooth-transition",
        })
        .from(
          this.elContent,
          {
            yPercent: 100,
            duration: 1,
            ease: "smooth-transition",
          },
          "<"
        )
        .from(
          this.elLogoChars,
          {
            yPercent: 100,
            duration: 0.5,
            ease: "power2.out",
            stagger: {
              each: 0.2,
            },
          },
          "<+0.5"
        )
        .call(done)
        .to(
          this.elLogoChars,
          {
            yPercent: -100,
            duration: 0.3,
            ease: "power1.in",
            stagger: {
              each: 0.05,
            },
          },
          ">+=1"
        )
        .to(
          this.el,
          {
            yPercent: 100,
            duration: 1,
            ease: "smooth-transition",
          },
          ">"
        )
        .from(
          this.elContent,
          {
            yPercent: -100,
            duration: 1,
            ease: "smooth-transition",
          },
          "<"
        )
        .play();
    });
  }

  init(el) {
    this.el = el;
    this.elContent = selectFrom(".page-transition__content", el);
    this.elLogoChars = selectAllFrom(".logo__char", el);
    CustomEase.create(
      "smooth-transition",
      "M0,0 C0.214,0.012 0.432,0.086 0.538,0.43 0.617,0.686 0.822,1 1,1 "
    );
  }
}

export const appAnimations = new animations();
