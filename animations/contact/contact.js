import { gsap } from "gsap";
import { SplitText } from "~/assets/gsap-premium/SplitText";

gsap.registerPlugin(SplitText);

import { selectAllFrom } from "~/utils/utils";

export class animations {
  constructor() {
    this.el = null;
    this.contentCopySplit = null;
    this.elContentCreators = null;
    this.tl = null;
    this.transitioned = null;
    this.resizeHandler = null;
  }

  setEnterAnimations() {
    this.tl = gsap
      .timeline({
        paused: true,
      })
      .addLabel("start")
      .from(
        this.elContentCreators,
        {
          yPercent: 100,
        },
        !this.transitioned ? "" : ""
      )
      .addLabel("cta-in", "<")
      .addLabel("copy-in", "<=+0.5")
      .addLabel("header-in", "<=+0.25");
    this.tl.set(this.el, { autoAlpha: 1 }, "start");
    this.setContentCtaAnimations(this.tl);
    this.setContentHeaderAnimations(this.tl);
    this.setContentImageAnimations(this.tl);
    this.setContentCopyAnimations(this.tl);

    this.tl.play();
  }

  setContentHeaderAnimations(tl) {
    const scopeSelect = gsap.utils.selector(this.elContentHeading);
    const headerSpans = scopeSelect(".animation-span__inner");
    tl.from(
      headerSpans,
      {
        yPercent: 100,
        stagger: 0.01,
        duration: 0.8,
        rotate: 1,
        ease: "power2.out",
      },
      "header-in"
    );
  }

  setContentCopyAnimations(tl) {
    tl.from(
      this.elContentCopy,
      {
        yPercent: 20,
        autoAlpha: 0,
        duration: 1,
        ease: "circ.out",
      },
      "copy-in"
    );
    // const creditsButton = selectFrom(".action-button", this.elContentCopy);
    // creditsButton.classList.toggle("highlight");
    // tl.from(
    //   this.contentCopySplit.lines,
    //   {
    //     yPercent: 100,
    //     autoAlpha: 0,
    //     duration: 1,
    //     ease: "circ.out",
    //     stagger: 0.1,
    //   },
    //   "copy-in"
    // );
    // tl.add(() => creditsButton.classList.toggle("highlight"));
  }

  setContentCtaAnimations(tl) {
    tl.from(
      this.elContentCta,
      {
        yPercent: 20,
        autoAlpha: 0,
        ease: "circ.out",
      },
      "cta-in+="
    );
  }

  setContentImageAnimations(tl) {
    const scopedSelect = gsap.utils.selector(this.elContentImage);
    const imgTl = gsap
      .timeline({ paused: true })
      .to(scopedSelect(".reveal-site-image__cover"), {
        yPercent: 100,
        duration: 1.5,
        ease: "circ.out",
      })
      .from(
        scopedSelect(".site-image__image"),
        {
          scale: 2,
          duration: 1.5,
          ease: "slow",
        },
        "<"
      )
      .set(scopedSelect(".reveal-site-image__cover"), {
        display: "none",
      });
    tl.add(imgTl.play(), "header-in");
  }

  split() {
    this.contentCopySplit = new SplitText(this.elContentCopy, {
      type: "words,lines",
      lineThreshold: 1,
      linesClass: "content__copy__lines",
      wordsClass: "content__copy__words",
    });
    this.handleResize();
  }

  revertSplits() {
    this.contentCopySplit && this.contentCopySplit.revert();
    this.contentCtaSplit && this.contentCtaSplit.revert();

    this.contentCopySplit = null;
    this.contentCtaSplit = null;
  }

  handleResize() {
    this.resizeHandler = () => {
      this.revertSplits();
    };
    window.addEventListener("resize", this.resizeHandler);
  }

  kill() {
    this.resizeHandler &&
      window.removeEventListener("resize", this.resizeHandler);
  }

  init(el, transitioned = true) {
    this.el = el;
    this.elContentHeading = selectFrom(".content__heading", el);
    this.elContentImage = selectFrom(
      ".reveal-wrapper-content__img-container",
      el
    );
    this.elContentCopy = selectFrom(".content__copy.body", el);
    this.elContentCta = selectFrom(".content__cta", el);
    this.elContentCreators = selectAllFrom(
      ".content__creators .creators__credit",
      el
    );

    this.setEnterAnimations();
  }
}
