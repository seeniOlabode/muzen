import { gsap } from "gsap";
import { CustomEase } from "gsap/all";
import { SplitText } from "~/assets/gsap-premium/SplitText";

gsap.registerPlugin(CustomEase, SplitText);

class animations {
  constructor() {
    this.enterTl = null;
    this.quoteSplit = null;
  }

  enter(el, done) {
    this.split();

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        done();
        tl.revert();
      },
    });

    tl.addLabel("start-slide-in")
      .from(
        ".site-credits__content",
        {
          yPercent: -100,
          ease: this.creditsEase,
          duration: 1.2,
        },
        "start-slide-in"
      )
      .from(
        ".content__inner-wrapper",
        {
          yPercent: 100,
          ease: this.creditsEase,
          duration: 1.2,
        },
        "start-slide-in"
      )
      .from(
        ".site-credits__backdrop",
        {
          autoAlpha: 0,
        },
        "start-slide-in+=0.6"
      )
      .addLabel("end-slide-in");

    this.creditsReveal(tl);
    tl.play();
  }

  creditsReveal(tl) {
    tl.from(
      ".heading-1 .site-credits__transition",
      {
        yPercent: 100,
        rotate: 10,
        ease: "circ.out",
        duration: 0.5,
      },
      "end-slide-in-=0.85"
    );
    gsap.utils.toArray(".credits__cred-group").forEach((credGroup) => {
      tl.from(
        selectAllFrom(".site-credits__transition", credGroup),
        {
          yPercent: 100,
          rotate: 10,
          ease: "circ.out",
          stagger: 0.12,
          duration: 0.5,
        },
        "end-slide-in-=0.75"
      );
    });
    tl.from(
      this.quoteSplit.lines,
      {
        yPercent: 120,
        opacity: 0,
        ease: "power3.out",
        stagger: 0.15,
        duration: 1,
      },
      "end-slide-in-=0.2"
    );
  }

  leave(el, done) {
    this.split();

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        done();
        tl.revert();
      },
    });

    tl.addLabel("start-slide-out")
      .to(
        ".site-credits__content",
        {
          yPercent: -100,
          ease: this.creditsEase,
          duration: 1.2,
        },
        "start-slide-out"
      )
      .to(
        ".content__inner-wrapper",
        {
          yPercent: 100,
          ease: this.creditsEase,
          duration: 1.2,
        },
        "start-slide-out"
      )
      .to(
        ".site-credits__backdrop",
        {
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.in",
        },
        "start-slide-out+=0.6"
      )
      .addLabel("end-slide-out");

    this.creditsHide(tl);
    tl.play();
  }

  creditsHide(tl) {
    tl.to(
      this.quoteSplit.lines,
      {
        yPercent: 120,
        opacity: 0,
        ease: "power3.in",
        stagger: {
          each: 0.25,
          from: "end",
        },
        duration: 0.5,
      },
      "end-slide-out-=1.3"
    );
    gsap.utils.toArray(".credits__cred-group").forEach((credGroup) => {
      tl.to(
        selectAllFrom(".site-credits__transition", credGroup),
        {
          yPercent: 100,
          rotate: 10,
          ease: "circ.in",
          stagger: {
            each: 0.12,
            from: "end",
          },
          duration: 0.3,
        },
        "end-slide-out-=1.2"
      );
    });
    tl.to(
      ".heading-1 .site-credits__transition",
      {
        yPercent: 100,
        rotate: 10,
        ease: "circ.in",
        duration: 0.5,
      },
      ">"
    );
  }

  split() {
    if (!this.quoteSplit) {
      this.quoteSplit = new SplitText(".site-footer__quote", {
        type: "lines,words",
        lineThreshold: 2,
        linesClass: "site-footer__quote__line",
      });
    }
  }

  handleResize() {
    window.addEventListener("resize", () => {
      this.quoteSplit && this.quoteSplit.revert();
      this.quoteSplit = null;
    });
  }

  init() {
    this.creditsEase = CustomEase.create(
      "credits-in",
      "M0,0 C0.65,0 0.35,1 1,1 "
    );
    this.handleResize();
  }
}

export const creditsAnimations = new animations();
