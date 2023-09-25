import { gsap } from "gsap";

export default function (target) {
  onMounted(() => {
    gsap.set(target, {
      overflow: "hidden",
    });
  });
  onUnmounted(() => {
    gsap.set(target, {
      overflow: "unset",
    });
  });
}
