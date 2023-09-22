import { gsap } from "gsap";
import { ScrollTrigger, CustomEase, Draggable } from "gsap/all";
import { SplitText } from "~/assets/gsap-premium/SplitText";

gsap.registerPlugin(ScrollTrigger, CustomEase, Draggable, SplitText);

import { selectAllFrom, elementHasWidth } from "~/utils/utils";

class animations {
  constructor() {
    this.el = null;
    this.contentCopySplit = null;
  }

  setEnterAnimations() {
    this.tl = gsap
      .timeline({
        paused: true,
      })
      .addLabel("start")
      .from(this.elContentCreators, {
        yPercent: 100,
      })
      .addLabel("cta-in", "<")
      .addLabel("copy-in", "<=+0.5")
      .addLabel("header-in", "<=+0.25");
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
    const creditsButton = selectFrom(".action-button", this.elContentCopy);
    creditsButton.classList.toggle("highlight");
    this.contentCopySplit.lines.forEach((l, i) => {
      const words = selectAllFrom(".content__copy__words", l);
      tl.from(
        words,
        {
          yPercent: 100,
          duration: 1,
          rotate: 7,
          ease: "circ.out",
        },
        "copy-in+=" + i * 0.1
      );
    });
    tl.add(() => creditsButton.classList.toggle("highlight"));
  }

  setContentCtaAnimations(tl) {
    this.contentCtaSplit.lines.forEach((l, i) => {
      const words = selectAllFrom(".content__cta__words", l);
      tl.from(
        words,
        {
          yPercent: 100,
          duration: 1,
          // rotate: 5,
          ease: "circ.out",
        },
        "cta-in+=" + i * 0.1
      );
    });
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
        scopedSelect(".site-image__image-wrapper"),
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
    this.contentCtaSplit = new SplitText(this.elContentCta, {
      type: "words,lines",
      lineThreshold: 1,
      linesClass: "content__cta__lines",
      wordsClass: "content__cta__words",
    });
  }

  init(el) {
    this.el = el;
    this.elContentHeading = selectFrom(".content__heading", el);
    this.elContentImage = selectFrom(
      ".reveal-wrapper-content__img-container",
      el
    );
    console.log(this.elContentImage);
    this.elContentCopy = selectFrom(".content__copy.body", el);
    this.elContentCta = selectFrom(".content__cta", el);
    this.elContentCreators = selectAllFrom(
      ".content__creators .creators__credit",
      el
    );
    this.split();
    this.setEnterAnimations();
  }
}

export const ContactPageAnimations = new animations();
