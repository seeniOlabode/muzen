import { gsap } from "gsap";

class animations {
  constructor() {}

  setFilterAnimation() {
    this.filterTl = gsap
      .timeline({
        paused: true,
      })
      .to(this.baseFrequency, {
        x: 0.2,
        duration: 0.25,
      })
      .to(this.baseFrequency, {
        x: 0,
        duration: 0.2,
      });
  }

  init(el, baseFrequency) {
    this.el = el;
    this.baseFrequency = baseFrequency;
  }
}
