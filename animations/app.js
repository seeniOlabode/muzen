import { gsap } from "gsap";
import { ScrollTrigger, CustomEase } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, CustomEase);

import { selectAllFrom } from "~/utils/utils";

import { emitter } from "~/plugins/event-bus";

class animations {
  constructor() {
    this.el = null;
    this.elContent = null;
    this.elLogoChars = null;
    this.leaveTl = null;
    this.transitionAlmostOut = null;
  }

  async leave(_, done, mid, page) {
    // NOTE: the done callback passed to this method will always be different, we can't keep calling the same done in our timeline so we must update it;
    return new Promise((r) => {
      const transitionAlmostOut = () => {
        console.log("page: ", page);
        emitter.emit(page + "-transition-almost-out");
      };
      const onComplete = () => {
        r();
        this.transitionAlmostOut = transitionAlmostOut;
        emitter.emit("transition-out");
      };
      if (this.leaveTl) {
        this.transitionAlmostOut &&
          this.leaveTl.remove(this.transitionAlmostOut);

        return this.leaveTl
          .restart()
          .add(done, "done-callback")
          .add("almost-out", transitionAlmostOut)
          .eventCallback("onComplete", onComplete);
      }

      this.leaveTl = gsap
        .timeline({
          puased: true,
          onComplete: onComplete,
        })
        .set(this.el, {
          autoAlpha: 1,
        })
        .from(this.el, {
          yPercent: -100,
          duration: 1.5,
          ease: "smooth-transition",
        })
        .from(
          this.elContent,
          {
            yPercent: 100,
            duration: 1.5,
            ease: "smooth-transition",
          },
          "<"
        )
        .from(
          this.elLogoChars,
          {
            yPercent: 100,
            duration: 0.55,
            ease: "power2.out",
            stagger: {
              each: 0.15,
            },
          },
          "<+0.8"
        )
        .addLabel("done-callback")
        .add(done, "done-callback")
        .call(() => {
          emitter.emit("page-in", true);
          if (mid) {
            mid();
          }
        })
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
            duration: 1.3,
            ease: "smooth-transition",
          },
          ">"
        )
        .from(
          this.elContent,
          {
            yPercent: -100,
            duration: 1.3,
            ease: "smooth-transition",
          },
          "<"
        )
        .addLabel("almost-out", "<+=0.5")
        .call(
          () => {
            emitter.emit(page + "-transition-almost-out");
          },
          [],
          "almost-out"
        )
        .play();
    });
  }

  init(el) {
    this.el = el;
    this.elContent = selectFrom(".page-transition__content", el);
    this.elLogoChars = selectAllFrom(".logo__char", el);
    CustomEase.create("smooth-transition", "M0,0 C0.65,0 0.35,1 1,1 ");
  }
}

export const appAnimations = new animations();
