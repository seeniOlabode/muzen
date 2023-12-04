import { gsap } from "gsap";
import { CustomEase } from "gsap/all";
import { selectAllFrom } from "~/utils/utils";
import { emitter } from "~/plugins/event-bus";

gsap.registerPlugin(CustomEase);

class animations {
  constructor() {
    this.el = null;
    this.elContent = null;
    this.elLogoChars = null;
    this.leaveTl = null;
    this.transitionAlmostOut = null;
    this.callbacks = [];
  }

  async leave(_, done, callbacks) {
    // NOTE: the done callback passed to this method will always be different, we can't keep calling the same done in our timeline so we must update it;
    if (callbacks) {
      this.setCallbacks(callbacks);
    }
    return new Promise((r) => {
      if (this.leaveTl) {
        return this.leaveTl
          .eventCallback("onComplete", r)
          .restart()
          .play()
          .add(() => {
            done();
            emitter.emit("scrollbar-page-in", true);
          }, "done");
      }
    });
  }

  setLeaveAnimation() {
    this.leaveTl = gsap
      .timeline({
        paused: true,
      })
      .addLabel("start")
      .set(this.el, {
        autoAlpha: 1,
      })
      .from(
        this.el,
        {
          yPercent: -100,
          duration: 1.5,
          ease: "smooth-transition",
        },
        "start"
      )
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

      .addLabel("done")
      .call(() => {
        // Scroll back to the top mid animation
        this.scrollToTop && this.scrollToTop();
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
      );
  }

  setCallbacks(callbacks) {
    this.callbacks = callbacks;
    callbacks.forEach((c) => {
      this.leaveTl.add(this.createEmitCb(c.name), c.time);
    });
  }

  createEmitCb(name) {
    return () => {
      emitter.emit(name, true);
    };
  }

  init(el, config) {
    this.el = el;
    this.elContent = selectFrom(".page-transition__content", el);
    this.elLogoChars = selectAllFrom(".logo__char", el);
    CustomEase.create("smooth-transition", "M0,0 C0.65,0 0.35,1 1,1 ");
    this.scrollToTop = config.scrollToTop;
    this.setLeaveAnimation();
  }
}

export const appAnimations = new animations();
