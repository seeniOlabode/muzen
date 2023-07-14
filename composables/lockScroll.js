import { useScrollLock } from "@vueuse/core";
import { lenis } from "~/plugins/lenis";

export default function (lock) {
  onMounted(() => {
    const body = selectFrom("body", document.documentElement);
    const isLocked = useScrollLock(body);
    watch(
      lock,
      (value) => {
        if (value) {
          lenis.stop();
        } else {
          lenis.start();
        }
        isLocked.value = !!value;
      },
      { immediate: true }
    );
  });
}
