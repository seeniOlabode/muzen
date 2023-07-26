import { useScrollLock } from "@vueuse/core";
import { lenis } from "~/plugins/lenis";

export default function (lock) {
  onMounted(() => {
    const body = selectFrom("body", document.documentElement);
    watch(
      lock,
      (value) => {
        if (value) {
          lenis.stop();
        } else {
          lenis.start();
        }
      },
      { immediate: true }
    );
  });
  onBeforeMount(() => {
    lenis.start();
  });
}
