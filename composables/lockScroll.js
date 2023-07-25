import { useScrollLock } from "@vueuse/core";
import { lenis } from "~/plugins/lenis";

export default function (lock) {
  onMounted(() => {
    const body = selectFrom("body", document.documentElement);
    watch(
      lock,
      (value) => {
        console.log(value);
        if (value) {
          lenis.stop();
          console.log("stopped");
        } else {
          lenis.start();
          console.log("started");
        }
        // isLocked.value = !!value;
      },
      { immediate: true }
    );
  });
}
